import { types } from "mobx-state-tree";

function createArtJob(url, artStyleId, artMixingLevel, imageId) {
  return fetch(url, {
    method: "POST",
    mode: "cors",
    headers: new Headers({
      "Content-Type": "text/json"
    }),
    body: JSON.stringify({
      imgId: imageId,
      styles: [{ id: artStyleId, mixingLevel: artMixingLevel }]
    })
  }).then(function(response) {
    return response.json();
  });
}

function waitForJob(url) {
  return new Promise(function(resolve, reject) {
    const timeout = setTimeout(function() {
      reject("Timed out. Server might be too busy, please try again later");
    }, 60000);

    const check = setInterval(function() {
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
    originImageId: types.maybe(types.string),
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
      return self.originImageId && self.selectedStyle;
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

    setOriginImage(imageId, imageUrl) {
      self.originImageId = imageId;
      self.originImageUrl = imageUrl;
    },

    resetOriginImage() {
      self.originImageId = null;
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

    build() {
      if (!self.isValidForm) {
        self.showError = true;
      } else {
        self.state = "building";
        self.showError = false;

        createArtJob(
          self.createArtJobUrl,
          self.selectedStyle,
          self.mixingLevel,
          self.originImageId
        )
          .then(response => {
            return waitForJob(self.queryArtJobUrl(response.jobId));
          })
          .then(response => {
            self.succeed(response.outputUrls[0]);
          })
          .catch(error => {
            console.log(error);

            self.fail(error.message);
          });
      }
    },

    reset() {
      self.state = "form";
      self.showError = false;
      self.criticalError = null;
      self.originImageId = null;
      self.originImageUrl = null;
      self.selectedStyle = null;
      self.styledImageUrl = null;
    }
  }));

export default BuildModel;
