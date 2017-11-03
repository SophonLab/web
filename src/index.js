import React from 'react';
import ReactDOM from 'react-dom';
import RootModel from './RootModel';
import RootComponent from './RootComponent';
import registerServiceWorker from './registerServiceWorker';
import createHistory from 'history/createBrowserHistory';
import debug from 'debug';

const history = createHistory();
const historyDebug = debug('web:history');

const model = RootModel.create({
  config: {
    stage: 'dev',
    clientId: '46e9v2cr3ona9412mdc5488vdq'
  }
}, {
  history
});

history.listen((location, action) => {
  // location is an object like window.location
  historyDebug(
    'Received new history change',
    action,
    location.pathname,
    location.state
  );

  model.route(location);
});

model.route(history.location);

ReactDOM.render(
  <RootComponent model={ model } />,
  document.getElementById('root')
);
registerServiceWorker();
