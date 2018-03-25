import React from "react";
import { Button, Row, Col } from "antd";
import styled from "styled-components";
import { media } from "../../utils/css";
import ProgressiveImage from "react-progressive-image";

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
        <ProgressiveImage src="resolution-bg.jpg" placeholder="loader.gif">
          {src => <BgImage alt="Resolution Background" src={src} />}
        </ProgressiveImage>
      </Col>
    </Row>
    <Row>
      <Col
        span={8}
        style={{ background: "#008000", borderRight: "4px solid #ececec" }}
      >
        <ProgressiveImage src="resolution-1k.jpg" placeholder="loader.gif">
          {src => <ZoomImage atl="1K" src={src} width="1176" height="350" />}
        </ProgressiveImage>
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
        <ProgressiveImage src="resolution-2k.jpg" placeholder="loader.gif">
          {src => <ZoomImage alt="2K" src={src} />}
        </ProgressiveImage>
        <CardHeader>2K</CardHeader>
        <CardBody>
          <p>Contact Us</p>
        </CardBody>
      </Col>
      <Col
        span={8}
        style={{ background: "#8B0000", borderLeft: "4px solid #ececec" }}
      >
        <ProgressiveImage src="resolution-8k.jpg" placeholder="loader.gif">
          {src => <ZoomImage alt="8K" src={src} />}
        </ProgressiveImage>
        <CardHeader>8K</CardHeader>
        <CardBody>
          <p>Contact Us</p>
        </CardBody>
      </Col>
    </Row>
  </div>
);
