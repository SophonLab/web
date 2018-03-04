import { types, getEnv } from "mobx-state-tree";

const PrivacyModel = types.model("PrivacyModel", {}).actions(self => ({
  pushUrl(url, state = {}) {
    getEnv(self).history.push(url, state);
  }
}));

export default PrivacyModel;
