import { types } from "mobx-state-tree";

// function createArtJob(url) {
//   // POST to art job
//   return fetch(url).then(() => true);
// }

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
    errorMessage: types.maybe(types.string)
  })
  .views(self => ({
    get uploadUrl() {
      return self.apiBase + "/api/v1/image";
    },

    createArtJobUrl() {
      return self.apiBase + "/api/v1/art/";
    },

    queryArtJobUrl(id) {
      return self.apiBase + "/api/v1/art/" + id;
    },

    outputUrl(id) {
      return self.apiBase + "/api/v1/art/output/" + id;
    },

    get isBuilding() {
      return self.state === "building";
    },

    get isBuilt() {
      return self.state === "built";
    },

    get hasError() {
      return self.errorMessage !== null;
    }
  }))
  .actions(self => ({
    setSelectedStyle(selectedStyle) {
      self.selectedStyle = selectedStyle;
    },

    setMixingLevel(mixingLevel) {
      self.mixingLevel = mixingLevel;
    },

    succeed(styledImageUrl) {
      self.state = "built";
      self.styledImageUrl = styledImageUrl;
    },

    fail(message) {
      self.state = "form";
      self.errorMessage = message;
    },

    build() {
      self.state = "building";

      // TODO create art job
      // interval querying state every 3 seconds
      const checking = setInterval(() => {
        // check art job state
        const result = Math.floor(Math.random() * 100);

        if (result > 50) {
          self.succeed("/how-machine-learning.jpg");
        } else {
          self.fail("Time Out");
        }

        clearInterval(checking);
      }, 3000);
    },

    reset() {
      self.state = "form";
      self.errorMessage = null;
      self.styledImageUrl = null;
    }
  }));

export default BuildModel;
