import React from "react";
import { Layout, Icon } from "antd";
const { Footer } = Layout;

export default ({ identity, pushUrl }) => (
  <Footer style={{ textAlign: "center" }}>
    {identity && (
      <p>
        Your API token is <strong>{identity.accessToken}</strong>
      </p>
    )}
    <p>
      <a
        href="/privacy"
        onClick={e => {
          e.preventDefault();
          pushUrl("/privacy");
        }}
      >
        Privacy
      </a>
    </p>
    ©2017 Sophon LLC.
    <p>
      <a href="mailto:photopaint.us@gmail.com">
        <Icon type="mail" style={{ marginRight: ".1em" }} />photopaint.us@gmail.com
      </a>
    </p>
  </Footer>
);
