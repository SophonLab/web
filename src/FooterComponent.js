import React from 'react';
import { Layout } from 'antd';
const { Footer } = Layout;

export default ({ identity }) => (
  <Footer style={{ textAlign: 'center' }}>
    {
      identity &&
      <p>Your API token is <strong>{ identity.accessToken }</strong></p>
    }
    ©2017 Sophon LLC.
  </Footer>
);
