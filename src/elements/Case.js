import React from "react";
import { Row, Col } from "antd";

export default ({ styled, origin, style, bottomHeight = "auto" }) => (
  <div>
    <Row key="styled" style={{ marginBottom: "1px" }}>
      <Col span={24}>
        <img
          src={styled}
          alt="Styled"
          style={{ width: "100%", height: "auto" }}
        />
      </Col>
    </Row>
    <Row key="origin">
      <Col span={12} style={{ paddingRight: "1px" }}>
        <img
          src={origin}
          alt="Origin"
          style={{ width: "100%", height: bottomHeight }}
        />
      </Col>
      <Col span={12} style={{ paddingLeft: "1px" }}>
        <img
          src={style}
          alt="Style"
          style={{ width: "100%", height: bottomHeight }}
        />
      </Col>
    </Row>
  </div>
);
