import { types, getEnv } from 'mobx-state-tree';

const Case = types
  .model('Case', {
    styled: types.string,
    origin: types.string,
    style: types.string
  });

const IndexModel = types
  .model('IndexModel', {
    cases: types.optional(types.array(Case), [])
  })
  .actions(self => ({
    pushUrl(url, state = {}) {
      getEnv(self).history.push(url, state);
    }
  }));

export default IndexModel;
