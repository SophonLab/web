import { types } from "mobx-state-tree";

const BuildModel = types
  .model("BuildModel", {
    apiBase: types.string
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
    // TODO
  }));

export default BuildModel;
