import React from "react";
import { Button, Row, Col } from "antd";
import styled from "styled-components";
import { media } from "../../utils/css";

const BgImage = styled.img`
  width: 100%;
  height: auto;
`;

const ZoomImage = styled.img`
  width: 70%;
  height: auto;
  border-radius: 50%;
  border: 4px solid #fafafa;
  margin: -36% 15% 0;
`;

const CardHeader = styled.div`
  text-align: center;
  font-size: 2em;
  color: #fff;
`;

const CardBody = styled.div`
  padding: 2em;
  background: #fff;
  line-height: 2.5em;
  min-height: 11em;
  text-align: center;

  ${media.phone`
    display: none;
  `};
  
`;

export default ({ model }) => (
  <div style={{ marginTop: "1em" }}>
    <Row>
      <Col span={24}>
        <BgImage src="./resolution-bg.jpg" />
      </Col>
    </Row>
    <Row>
      <Col
        span={8}
        style={{ background: "#008000", borderRight: "4px solid #ececec" }}
      >
        <ZoomImage src="./resolution-1k.jpg" />
        <CardHeader>1K</CardHeader>
        <CardBody>
          <p>Free!</p>
          <p>
            <Button
              type="primary"
              size="small"
              onClick={event => {
                event.preventDefault();
                model.pushUrl("/build");
              }}
            >
              Try it Now
            </Button>
          </p>
        </CardBody>
      </Col>
      <Col
        span={8}
        style={{
          background: "#005b8c",
          borderLeft: "2px solid #ececec",
          borderRight: "2px solid #ececec"
        }}
      >
        <ZoomImage src="./resolution-2k.jpg" />
        <CardHeader>2K</CardHeader>
        <CardBody>
          <p>Contact Us</p>
        </CardBody>
      </Col>
      <Col
        span={8}
        style={{ background: "#8B0000", borderLeft: "4px solid #ececec" }}
      >
        <ZoomImage src="./resolution-8k.jpg" />
        <CardHeader>8K</CardHeader>
        <CardBody>
          <p>Contact Us</p>
        </CardBody>
      </Col>
    </Row>
  </div>
);
