import React from "react";
import { Row } from "antd";

export default props => (
  <Row
    {...props}
    style={{
      padding: "2em 4em",
      ...props.style
    }}
  />
);
