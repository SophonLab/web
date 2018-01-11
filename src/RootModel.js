import { types, getEnv, getSnapshot } from "mobx-state-tree";
import debug from "debug";
import { find } from "lodash";
import { getAttrFromHash } from "./utils/hash";
import { signInUrl, signOutUrl } from "./utils/auth";
import IndexModel from "./pages/index/IndexModel";
import BuildModel from "./pages/build/BuildModel";
import AboutModel from "./pages/about/AboutModel";
import HowModel from "./pages/how/HowModel";
import NotFoundModel from "./pages/not-found/NotFoundModel";
import PricingModel from "./pages/pricing/PricingModel";
import cases from "./cases.json";
import { encode, decode } from "base64url";

const rootDebug = debug("web:model:root");

const Identity = types.model("Identity", {
  accessToken: types.string
});

const Config = types.model("Config", {
  stage: types.string,
  clientId: types.string
});

const Location = types.model("Location", {
  pathname: types.string,
  search: types.string,
  hash: types.string
});

const Pages = types.model("Pages", {
  "/": types.maybe(IndexModel),
  "/how": types.maybe(HowModel),
  "/build": types.maybe(BuildModel),
  "/pricing": types.maybe(PricingModel),
  "/about": types.maybe(AboutModel),
  "/404": types.maybe(NotFoundModel)
});

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
    setup() {
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
    pages: types.optional(Pages, Pages.create())
  })
  .views(self => ({
    hasIdentity() {
      return self.identity !== null;
    },

    stateToBase64() {
      return encode(JSON.stringify(getSnapshot(self)));
    },

    signInUrl() {
      return signInUrl(
        self.config.stage,
        self.config.clientId,
        self.stateToBase64()
      );
    },

    registerUrl() {
      return signInUrl(
        self.config.stage,
        self.config.clientId,
        self.stateToBase64()
      );
    },

    signOutUrl() {
      return signOutUrl(self.config.stage, self.config.clientId);
    }
  }))
  .actions(self => ({
    afterCreate() {
      // restore token from local storage
      if (localStorage && localStorage.getItem("accessToken")) {
        self.setIdentity(localStorage.getItem("accessToken"));
      }
    },

    pushUrl(url, state = {}) {
      getEnv(self).history.push(url, state);
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

        getEnv(self).history.replace(snapshot.location);

        self.location = snapshot.location;
        self.pages = snapshot.pages;
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
            [rule.pathname]: rule.setup(newLocation)
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
  }));

export default RootModel;
