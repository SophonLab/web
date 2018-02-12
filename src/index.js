import React from "react";
import ReactDOM from "react-dom";
import RootModel from "./RootModel";
import RootComponent from "./RootComponent";
import registerServiceWorker from "./registerServiceWorker";
import createHistory from "history/createBrowserHistory";

const history = createHistory();

const model = RootModel.create(
  {
    config: {
      clientId: "phMSpc6uBLJan39hueeMSbIJIJuJFIr0",
      apiBase: "https://ur2mz26vge.execute-api.us-west-2.amazonaws.com/auth"
    }
  },
  {
    history,
    fetch: window.fetch
  }
);

ReactDOM.render(
  <RootComponent model={model} />,
  document.getElementById("root")
);
registerServiceWorker();
