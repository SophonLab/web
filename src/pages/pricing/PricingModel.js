import { types, getEnv } from 'mobx-state-tree';

const PricingModel = types
  .model('PricingModel', {
  })
  .actions(self => ({
    pushUrl(url, state = {}) {
      getEnv(self).history.push(url, state);
    }
  }));

export default PricingModel;
