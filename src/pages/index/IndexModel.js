import { types } from 'mobx-state-tree';

const Case = types
  .model('Case', {
    styled: types.string,
    origin: types.string,
    style: types.string
  });

const IndexModel = types
  .model('IndexModel', {
    cases: types.optional(types.array(Case), [])
  });

export default IndexModel;
