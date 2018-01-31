import React from "react";
import ReactDOM from "react-dom";
import RootModel from "./RootModel";
import RootComponent from "./RootComponent";
import registerServiceWorker from "./registerServiceWorker";
import createHistory from "history/createBrowserHistory";
import debug from "debug";

const history = createHistory();
const historyDebug = debug("web:history");

const model = RootModel.create(
  {
    config: {
      clientId: "phMSpc6uBLJan39hueeMSbIJIJuJFIr0",
      apiBase: "//ec2-35-162-65-98.us-west-2.compute.amazonaws.com:8080"
      // apiBase: "https://ur2mz26vge.execute-api.us-west-2.amazonaws.com/dev"
    }
  },
  {
    history
  }
);

history.listen((location, action) => {
  // location is an object like window.location
  historyDebug(
    "Received new history change",
    action,
    location.pathname,
    location.state
  );

  model.route(location);
});

model.route(history.location);

ReactDOM.render(
  <RootComponent model={model} />,
  document.getElementById("root")
);
registerServiceWorker();
