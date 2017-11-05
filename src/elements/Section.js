import React from 'react';
import { Row } from 'antd';

export default (props) => (
  <Row
    { ...props }
    style={{
      padding: '25px 50px',
      ...props.style
    }}
  />
);
