import { types, getEnv, getSnapshot } from 'mobx-state-tree';
import debug from 'debug';
import { find } from 'lodash';
import { getAttrFromHash } from './utils/hash';
import IndexModel from './pages/index/IndexModel';
import cases from './cases.json';

const rootDebug = debug('web:model:root');

const Identity = types
  .model('Identity', {
    accessToken: types.string
  });

const Config = types
  .model('Config', {
    stage: types.string,
    clientId: types.string
  });

const Location = types
  .model('Location', {
    pathname: types.string,
    search: types.string,
    hash: types.string
  });

const HowPage = types
  .model('HowPage', {
  });

const AboutPage = types
  .model('AboutPage', {
  });

const PricingPage = types
  .model('PricingPage', {
  });

const NotFoundPage = types
  .model('NotFoundPage', {
  });

const Pages = types
  .model('Pages', {
    '/': types.maybe(IndexModel),
    '/how': types.maybe(HowPage),
    '/pricing': types.maybe(PricingPage),
    '/about': types.maybe(AboutPage),
    '/404': types.maybe(NotFoundPage)
  });

const routeRules = [
  {
    pathname: '/',
    setup() {
      return IndexModel.create({ cases });
    }
  },
  {
    pathname: '/how',
    setup() {
      return HowPage.create();
    }
  },
  {
    pathname: '/pricing',
    setup() {
      return PricingPage.create();
    }
  },
  {
    pathname: '/about',
    setup() {
      return AboutPage.create();
    }
  }
];

function findRoute(rules, location) {
  return find(rules, rule => {
    return rule.pathname === location.pathname;
  });
}

const RootModel = types
  .model('Root', {
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
      return btoa(JSON.stringify(getSnapshot(self)));
    },

    authUrl(type) {
      return (
        `https://sophon-${self.config.stage}.auth.us-east-1.amazoncognito.com/${type}` +
        '?' +
        [
          `redirect_uri=https://sophon-web-${self.config.stage}.now.sh/in`,
          'response_type=token',
          `client_id=${self.config.clientId}`,
          `state=${self.stateToBase64()}`
        ].join('&')
      );
    },

    signInUrl() {
      return self.authUrl('login');
    },

    registerUrl() {
      return self.authUrl('signup');
    }
  }))
  .actions(self => ({
    restoreFromBase64State(state) {
      // const snapshot = JSON.parse(atob(state));

    }
  }))
  .actions(self => ({
    pushUrl(url, state = {}) {
      getEnv(self).history.push(url, state);
    },

    route(location) {
      rootDebug('Route to:', location);

      const newLocation = Location.create({
        pathname: location.pathname,
        search: location.search,
        hash: location.hash
      });

      if (location.pathname === '/in') {
        const accessToken = getAttrFromHash(newLocation.hash, 'access_token');

        rootDebug('SignIn with AccessToken:', accessToken);

        if (accessToken) {
          self.identity = Identity.create({ accessToken });

          const state = getAttrFromHash(newLocation.hash, 'state');

          if (state) {
            rootDebug('Restoring State:', state);

            // TODO
          } else {
            rootDebug('Missing State');

            self.pushUrl('/');
          }
        } else {
          rootDebug('Missing Access Token');

          self.pushUrl('/');
        }
      } else if (location.pathname === '/out') {
        rootDebug('Clean Up Identity');

        self.identity = null;
        self.pushUrl('/');
      } else if (newLocation) {
        const rule = findRoute(routeRules, newLocation);

        if (rule) {
          self.pages = Pages.create({
            [rule.pathname]: rule.setup(newLocation)
          });
        } else {
          rootDebug('Unknown Path Name');

          self.pages = Pages.create({
            '/404': NotFoundPage.create()
          });
        }
      }

      self.location = newLocation;
    }
  }));

export default RootModel;
