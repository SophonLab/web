import { types, flow, getParent } from "mobx-state-tree";
import debug from "debug";

const buildDebug = debug("web:model:build");

async function createArt(fetch, artStyleId, artMixingLevel, imageUrl) {
  try {
    const response = await fetch("/art", {
      method: "POST",
      body: JSON.stringify({
        imgUrl: imageUrl,
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

function waitForArt(fetch, jobId) {
  return new Promise(function(resolve, reject) {
    let check = null;
    let timeout = null;

    timeout = setTimeout(function() {
      reject("Timed out. Server might be too busy, please try again later");
      clearInterval(check);
    }, 60000);

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
    }, 3000);
  });
}

const BuildModel = types
  .model("BuildModel", {
    selectedStyle: types.maybe(types.string),
    mixingLevel: types.optional(types.string, "mid"),
    state: types.optional(
      types.enumeration("State", ["form", "building", "built"]),
      "form"
    ),
    styledImageUrl: types.maybe(types.string),
    showError: types.optional(types.boolean, false),
    criticalError: types.maybe(types.string),
    originImageUrl: types.maybe(types.string)
  })
  .views(self => ({
    get store() {
      return getParent(self).store;
    },

    get uploadUrl() {
      return self.store.apiUrl("/image");
    },

    get isValidForm() {
      return self.originImageUrl && self.selectedStyle;
    },

    get isBuilding() {
      return self.state === "building";
    },

    get isBuilt() {
      return self.state === "built";
    },

    get accessToken() {
      return self.store.accessToken;
    }
  }))
  .actions(self => ({
    setRandomToken() {
      self.store.testToken();
    },

    setSelectedStyle(selectedStyle) {
      self.selectedStyle = selectedStyle;
    },

    setMixingLevel(mixingLevel) {
      self.mixingLevel = mixingLevel;
    },

    setOriginImageUrl(imageUrl) {
      self.originImageUrl = imageUrl;
    },

    resetOriginImageUrl() {
      self.originImageUrl = null;
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
          const { jobId } = yield createArt(
            self.store.fetch,
            self.selectedStyle,
            self.mixingLevel,
            self.originImageUrl
          );

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
      self.originImageUrl = null;
      self.selectedStyle = null;
      self.styledImageUrl = null;
    }
  }));

export default BuildModel;
