import { types, getEnv, flow, getParent } from "mobx-state-tree";
import debug from "debug";
import { map } from "lodash";

const indexDebug = debug("web:model:index");

function mapCases(cases) {
  return map(cases, c => ({
    origin: c.contentImageUrl,
    style: c.styleImageUrl,
    styled: c.outputImageUrl
  }));
}

async function loadArts(fetch, featured, offset, limit) {
  try {
    const response = await fetch(
      `/art?featured=${featured}&offset=${offset}&limit=${limit}`,
      {
        skipAuth: true
      }
    );

    if (response.status === 200) {
      return response.json();
    } else {
      return Promise.reject(
        new Error(
          "load featured arts failed, respond with HTTP code " + response.status
        )
      );
    }
  } catch (error) {
    indexDebug("load featured arts error", error);

    return Promise.reject(error);
  }
}

const Art = types.model("Art", {
  styled: types.string,
  origin: types.string,
  style: types.string
});

const IndexModel = types
  .model("IndexModel", {
    featuredArts: types.optional(types.array(Art), []),
    latestArts: types.optional(types.array(Art), [])
  })
  .views(self => ({
    get store() {
      return getParent(self).store;
    }
  }))
  .actions(self => ({
    pushUrl(url, state = {}) {
      getEnv(self).history.push(url, state);
    },

    loadFeaturedArts: flow(function* asyncLoadFeaturedArts() {
      try {
        const featuredArts = yield loadArts(self.store.fetch, true, 0, 4);

        self.featuredArts = mapCases(featuredArts);
      } catch (error) {
        indexDebug("load error: ", error);
      }
    }),

    loadLatestArts: flow(function* asyncLoadLatestArts() {
      try {
        const latestArts = yield loadArts(self.store.fetch, false, 0, 20);

        self.latestArts = mapCases(latestArts);
      } catch (error) {
        indexDebug("load error: ", error);
      }
    })
  }))
  .actions(self => ({
    afterAttach() {
      setTimeout(() => {
        self.loadFeaturedArts();
        self.loadLatestArts();
      }, 10);
    }
  }));

export default IndexModel;
