import {
  types,
  getEnv,
  getParent,
  getSnapshot,
  onAction,
  applyAction,
  flow
} from "mobx-state-tree";
import debug from "debug";
import { find } from "lodash";
import { getAttrFromHash } from "./utils/hash";
import { signInUrl, signOutUrl, refreshAccessTokenUrl } from "./utils/auth";
import { hangForever } from "./utils/promise";
import IndexModel from "./pages/index/IndexModel";
import BuildModel from "./pages/build/BuildModel";
import AboutModel from "./pages/about/AboutModel";
import HowModel from "./pages/how/HowModel";
import NotFoundModel from "./pages/not-found/NotFoundModel";
import PricingModel from "./pages/pricing/PricingModel";
import cases from "./cases.json";
import { encode, decode } from "base64url";

const rootDebug = debug("web:model:root");
const historyDebug = debug("web:history");

const Identity = types.model("Identity", {
  accessToken: types.string
});

const Config = types.model("Config", {
  clientId: types.string,
  apiBase: types.string
});

const Location = types.model("Location", {
  pathname: types.string,
  search: types.string,
  hash: types.string
});

const Pages = types
  .model("Pages", {
    "/": types.maybe(IndexModel),
    "/how": types.maybe(HowModel),
    "/build": types.maybe(BuildModel),
    "/pricing": types.maybe(PricingModel),
    "/about": types.maybe(AboutModel),
    "/404": types.maybe(NotFoundModel)
  })
  .views(self => ({
    get store() {
      return getParent(self);
    }
  }));

const routeRules = [
  {
    pathname: "/",
    setup() {
      return IndexModel.create({ cases });
    }
  },
  {
    pathname: "/how",
    setup() {
      return HowModel.create();
    }
  },
  {
    pathname: "/build",
    setup(newLocation, rootModel) {
      return BuildModel.create();
    }
  },
  {
    pathname: "/pricing",
    setup() {
      return PricingModel.create();
    }
  },
  {
    pathname: "/about",
    setup() {
      return AboutModel.create();
    }
  }
];

function findRoute(rules, location) {
  return find(rules, rule => {
    return rule.pathname === location.pathname;
  });
}

const RootModel = types
  .model("Root", {
    identity: types.maybe(Identity),
    config: Config,
    location: types.maybe(Location),
    pages: types.optional(Pages, Pages.create()),
    lastAction: types.optional(types.frozen, null),
    pendingFetch: types.optional(types.boolean, false)
  })
  .views(self => ({
    hasIdentity() {
      return self.identity !== null;
    },

    get accessToken() {
      return self.identity.accessToken;
    },

    stateToBase64() {
      return encode(JSON.stringify(getSnapshot(self)));
    },

    signInUrl() {
      return signInUrl(self.config.clientId, self.stateToBase64());
    },

    signOutUrl() {
      return signOutUrl(self.config.clientId);
    },

    apiUrl(url) {
      return self.config.apiBase + url;
    },

    get history() {
      return getEnv(self).history;
    }
  }))
  .actions(self => ({
    afterCreate() {
      // restore token from local storage
      if (localStorage && localStorage.getItem("accessToken")) {
        self.setIdentity(localStorage.getItem("accessToken"));
      }
    },

    // a customized fetch with the following abilities
    //   1. translate relative url to absolute url automatically
    //   2. supply access token to the request
    //   3. when 401 refresh access token and retry
    fetch: flow(function* fetch(url, options = {}) {
      const originFetch = getEnv(self).fetch;

      const finalUrl = self.config.apiBase + url;

      const finalOptions = {
        ...options,
        headers: {
          ...options.headers,
          "Content-Type": "text/json",
          Authorization: `Bearer ${self.identity.accessToken}`
        },
        mode: "cors"
      };

      rootDebug("fetch auth headers", finalOptions.headers);

      self.pendingFetch = true;

      const response = yield originFetch(finalUrl, finalOptions);

      if (response.status === 401) {
        self.refreshAccessToken();

        // keep hanging here stop further execution;
        return yield hangForever();
      }

      self.pendingFetch = false;

      return response;
    }),

    testToken() {
      self.identity.accessToken = "123";
    },

    refreshAccessToken() {
      rootDebug("redirect to authentication page");

      window.location = refreshAccessTokenUrl(
        self.config.clientId,
        self.stateToBase64()
      );
    },

    setLastAction(action) {
      self.lastAction = action;
    },

    pushUrl(url, state = {}) {
      self.history.push(url, state);
    },

    setIdentity(accessToken) {
      self.identity = Identity.create({ accessToken });

      if (localStorage) {
        localStorage.setItem("accessToken", accessToken);
      }
    },

    clearIdentity() {
      self.identity = null;

      if (localStorage) {
        localStorage.removeItem("accessToken");
      }
    },

    restoreFromBase64State(state) {
      const snapshot = JSON.parse(decode(state));

      if (snapshot) {
        rootDebug("Restoring:", snapshot);

        self.history.replace(snapshot.location);

        self.location = snapshot.location;
        self.pages = snapshot.pages;
        self.pendingFetch = snapshot.pendingFetch;
        self.lastAction = snapshot.lastAction;

        if (snapshot.pendingFetch) {
          rootDebug("Applying last action:", snapshot.lastAction);

          applyAction(self, snapshot.lastAction);
        }
      }
    },

    route(location) {
      rootDebug("Route to:", location);

      const newLocation = Location.create({
        pathname: location.pathname,
        search: location.search,
        hash: location.hash
      });

      if (location.pathname === "/in") {
        const accessToken = getAttrFromHash(newLocation.hash, "access_token");

        rootDebug("SignIn with AccessToken:", accessToken);

        if (accessToken) {
          self.setIdentity(accessToken);

          const state = getAttrFromHash(newLocation.hash, "state");

          if (state) {
            rootDebug("Restoring State:", state);

            self.restoreFromBase64State(state);
          } else {
            rootDebug("Missing State");

            self.pushUrl("/");
          }
        } else {
          rootDebug("Missing Access Token");

          self.pushUrl("/");
        }
      } else if (location.pathname === "/out") {
        rootDebug("Clean Up Identity");

        self.clearIdentity();
        self.pushUrl("/");
      } else if (newLocation) {
        const rule = findRoute(routeRules, newLocation);

        if (rule) {
          self.pages = Pages.create({
            [rule.pathname]: rule.setup(newLocation, self)
          });
        } else {
          rootDebug("Unknown Path Name");

          self.pages = Pages.create({
            "/404": NotFoundModel.create()
          });
        }

        self.location = newLocation;
      }
    }
  }))
  .actions(self => ({
    afterCreate() {
      rootDebug("initializing history");

      self.history.listen((location, action) => {
        // location is an object like window.location
        historyDebug(
          "Received new history change",
          action,
          location.pathname,
          location.state
        );

        self.route(location);
      });

      self.route(self.history.location);

      onAction(self, call => {
        rootDebug("last action: ", call);
        self.setLastAction(call);
      });
    }
  }));

export default RootModel;
