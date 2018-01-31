import { configure } from '@storybook/react';

// automatically import all files ending in *.stories.js
const elementsReq = require.context('../src/elements', true, /.stories.js$/);

function loadStories() {
  elementsReq.keys().forEach((filename) => elementsReq(filename));
}

configure(loadStories, module);
