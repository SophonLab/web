import { types, flow, getParent } from "mobx-state-tree";
import debug from "debug";

const buildDebug = debug("web:model:build");

async function createFastStyleArt(
  fetch,
  contentImageUrl,
  artStyleId,
  artMixingLevel
) {
  try {
    const response = await fetch("/art", {
      method: "POST",
      body: JSON.stringify({
        imgUrl: contentImageUrl,
        styles: [{ id: artStyleId, mixingLevel: artMixingLevel }]
      })
    });

    if (response.status === 200) {
      return response.json();
    } else {
      return Promise.reject(
        new Error(
          "create art job fail, http response code is " + response.status
        )
      );
    }
  } catch (error) {
    buildDebug("create art job error: ", error);

    return Promise.reject(error);
  }
}

function mapMixingLevelToAlpha(level) {
  if (level === "low") {
    return 0.1;
  } else if (level === "mid") {
    return 0.4;
  } else {
    return 0.8;
  }
}

async function createWCTFastStyleArt(
  fetch,
  contentImageUrl,
  styleImageUrl,
  artMixingLevel
) {
  try {
    const response = await fetch("/art", {
      method: "POST",
      body: JSON.stringify({
        WctFastStyleSpec: {
          contentImageUrl,
          styleImageUrl,
          styleDepth: 3,
          styleScale: 0.6,
          alpha: mapMixingLevelToAlpha(artMixingLevel),
          outputSize: 800 // hard code for now
        }
      })
    });

    if (response.status === 200) {
      return response.json();
    } else {
      return Promise.reject(
        new Error(
          "create art job fail, http response code is " + response.status
        )
      );
    }
  } catch (error) {
    buildDebug("create art job error: ", error);

    return Promise.reject(error);
  }
}

function waitForArt(fetch, jobId) {
  return new Promise(function(resolve, reject) {
    let check = null;
    let timeout = null;

    timeout = setTimeout(function() {
      reject("Timed out. Server might be too busy, please try again later");
      clearInterval(check);
    }, 120000);

    check = setInterval(function() {
      fetch(`/art/${jobId}`)
        .then(function(response) {
          return response.json();
        })
        .then(job => {
          if (job.status === "finished") {
            clearInterval(check);
            clearTimeout(timeout);

            resolve(job);
          } else if (job.status === "failed") {
            clearInterval(check);
            clearTimeout(timeout);

            reject(`Job #${jobId} failed. Please contact us.`);
          }
        })
        .catch(error => {
          buildDebug("wait for job error: ", error);

          clearInterval(check);
          clearTimeout(timeout);

          reject("Server error. Please contact us.");
        });
    }, 8000);
  });
}

const BuildModel = types
  .model("BuildModel", {
    mixingLevel: types.optional(
      types.enumeration("MixinLevel", ["low", "mid", "high"]),
      "mid"
    ),
    state: types.optional(
      types.enumeration("State", ["form", "building", "built"]),
      "form"
    ),
    styledImageUrl: types.maybe(types.string),
    showError: types.optional(types.boolean, false),
    criticalError: types.maybe(types.string),
    originImageUrl: types.maybe(types.string),
    styleType: types.optional(
      types.enumeration("StyleType", ["system", "custom"]),
      "system"
    ),
    selectedStyle: types.maybe(types.string),
    styleImageUrl: types.maybe(types.string)
  })
  .views(self => ({
    get store() {
      return getParent(self);
    },

    get uploadUrl() {
      return self.store.apiUrl("/image");
    },

    get isValidForm() {
      return (
        self.originImageUrl &&
        ((self.styleType === "system" && self.selectedStyle) ||
          (self.styleType === "custom" && self.styleImageUrl))
      );
    },

    get isBuilding() {
      return self.state === "building";
    },

    get isBuilt() {
      return self.state === "built";
    },

    get accessToken() {
      return self.store.accessToken;
    },

    get previewStyleImageUrl() {
      if (self.styleType === "system") {
        return `/style-images/${self.selectedStyle}.jpg`;
      } else {
        return self.styleImageUrl;
      }
    }
  }))
  .actions(self => ({
    setOriginImageUrl(imageUrl) {
      self.originImageUrl = imageUrl;
    },

    resetOriginImageUrl() {
      self.originImageUrl = null;
    },

    setSelectedStyle(selectedStyle) {
      self.selectedStyle = selectedStyle;
    },

    changeStyleType(type) {
      self.styleType = type;
    },

    setStyleImageUrl(imageUrl) {
      self.styleImageUrl = imageUrl;
    },

    resetStyleImageUrl() {
      self.styleImageUrl = null;
    },

    setMixingLevel(mixingLevel) {
      self.mixingLevel = mixingLevel;
    },

    refreshAccessToken() {
      self.store.refreshAccessToken();
    },

    succeed(styledImageUrl) {
      self.state = "built";
      self.styledImageUrl = styledImageUrl;
    },

    fail(message) {
      self.state = "form";
      self.criticalError = message;
    },

    build: flow(function* asyncBuild() {
      if (!self.isValidForm) {
        self.showError = true;
      } else {
        self.state = "building";
        self.showError = false;

        try {
          let artResponse = null;

          if (self.styleType === "system") {
            artResponse = yield createFastStyleArt(
              self.store.fetch,
              self.originImageUrl,
              self.selectedStyle,
              self.mixingLevel
            );
          } else {
            artResponse = yield createWCTFastStyleArt(
              self.store.fetch,
              self.originImageUrl,
              self.styleImageUrl,
              self.mixingLevel
            );
          }

          const { jobId } = artResponse;

          const { outputUrls } = yield waitForArt(self.store.fetch, jobId);

          self.succeed(outputUrls[0]);
        } catch (error) {
          buildDebug("build error: ", error);

          self.fail(error.message || error);
        }
      }
    }),

    reset() {
      self.state = "form";
      self.showError = false;
      self.criticalError = null;
      self.selectedStyle = null;
      self.styledImageUrl = null;
    }
  }));

export default BuildModel;
