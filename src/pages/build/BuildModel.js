import { types } from "mobx-state-tree";

const BuildModel = types
  .model("BuildModel", {
    apiBase: types.string,
    selectedStyle: types.maybe(types.string),
    mixingLevel: types.optional(types.string, "mid")
  })
  .views(self => ({
    uploadUrl() {
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
    }
  }))
  .actions(self => ({
    setSelectedStyle(selectedStyle) {
      self.selectedStyle = selectedStyle;
    },

    setMixingLevel(mixingLevel) {
      self.mixingLevel = mixingLevel;
    }
  }));

export default BuildModel;
