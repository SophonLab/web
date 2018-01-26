import React from "react";
import { Layout, Icon } from "antd";
const { Footer } = Layout;

export default ({ identity }) => (
  <Footer style={{ textAlign: "center" }}>
    {identity && (
      <p>
        Your API token is <strong>{identity.accessToken}</strong>
      </p>
    )}
    ©2017 Sophon LLC.
    <p>
      <a href="mailto:photopaint.us@gmail.com">
        <Icon type="mail" />photopaint.us@gmail.com
      </a>
    </p>
  </Footer>
);
