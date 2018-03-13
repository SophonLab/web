import React from "react";
import { Row, Col } from "antd";
import styled from "styled-components";
import { media } from "../utils/css";

const OutputImage = styled.img`
  width: 100%;
  height: 20vw;

  ${media.giant`
    height: 16vw;
  `};

  ${media.phone`
    height: 50vw;
  `};
`;

const InputImage = styled.img`
  width: 100%;
  height: 10vw;

  ${media.giant`
    height: 8vw;
  `};

  ${media.phone`
    height: 25vw;
  `};
`;

export default ({ styled, origin, style, bottomHeight = "10vw" }) => (
  <div>
    <Row key="styled" style={{ marginBottom: "1px" }}>
      <Col span={24}>
        <OutputImage
          src={styled}
          alt="Styled"
        />
      </Col>
    </Row>
    <Row key="origin">
      <Col span={12} style={{ paddingRight: "1px" }}>
        <InputImage
          src={origin}
          alt="Origin"
        />
      </Col>
      <Col span={12} style={{ paddingLeft: "1px" }}>
        <InputImage
          src={style}
          alt="Style"
        />
      </Col>
    </Row>
  </div>
);
