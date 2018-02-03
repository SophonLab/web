import { types, flow } from "mobx-state-tree";

async function createArtJob(url, artStyleId, artMixingLevel, imageUrl) {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    headers: new Headers({
      "Content-Type": "text/json"
    }),
    body: JSON.stringify({
      imgUrl: imageUrl,
      styles: [{ id: artStyleId, mixingLevel: artMixingLevel }]
    })
  });

  return response.json();
}

function waitForJob(url) {
  return new Promise(function(resolve, reject) {
    let check = null;
    let timeout = null;

    timeout = setTimeout(function() {
      reject("Timed out. Server might be too busy, please try again later");
      clearInterval(check);
    }, 60000);

    check = setInterval(function() {
      fetch(url, {
        mode: "cors",
        headers: new Headers({
          "Content-Type": "text/json"
        })
      })
        .then(function(response) {
          return response.json();
        })
        .then(function(job) {
          if (job.status === "finished") {
            clearInterval(check);
            clearTimeout(timeout);

            resolve(job);
          } else if (job.status === "failed") {
            clearInterval(check);
            clearTimeout(timeout);

            reject("Job failed. Please contact us. Job Url is " + url);
          }
        })
        .catch(function() {
          clearInterval(check);
          clearTimeout(timeout);

          reject("Server error. Please contact us.");
        });
    }, 3000);
  });
}

const BuildModel = types
  .model("BuildModel", {
    apiBase: types.string,
    selectedStyle: types.maybe(types.string),
    mixingLevel: types.optional(types.string, "mid"),
    state: types.optional(
      types.enumeration("State", ["form", "building", "built"]),
      "form"
    ),
    styledImageUrl: types.maybe(types.string),
    showError: types.optional(types.boolean, false),
    criticalError: types.maybe(types.string),
    jobId: types.maybe(types.string),
    originImageUrl: types.maybe(types.string)
  })
  .views(self => ({
    get uploadUrl() {
      return self.apiBase + "/api/v1/image";
    },

    get createArtJobUrl() {
      return self.apiBase + "/api/v1/art/";
    },

    queryArtJobUrl(jobId) {
      return self.apiBase + "/api/v1/art/" + jobId;
    },

    get isValidForm() {
      return self.originImageUrl && self.selectedStyle;
    },

    get isBuilding() {
      return self.state === "building";
    },

    get isBuilt() {
      return self.state === "built";
    }
  }))
  .actions(self => ({
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
          const { jobId } = yield createArtJob(
            self.createArtJobUrl,
            self.selectedStyle,
            self.mixingLevel,
            self.originImageUrl
          );

          const { outputUrls } = yield waitForJob(self.queryArtJobUrl(jobId));

          self.succeed(outputUrls[0]);
        } catch (error) {
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
