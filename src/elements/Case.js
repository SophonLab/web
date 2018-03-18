import React from "react";
import { Row, Col } from "antd";
import styled from "styled-components";
import { media } from "../utils/css";
import ImageZoom from "react-medium-image-zoom";

const OutputImage = styled.div`
  width: 100%;
  height: 14vw;

  ${media.giant`
    height: 14vw;
  `};

  ${media.tablet`
    height: 30vw;
  `};

  ${media.phone`
    height: 50vw;
  `};
`;

const InputImage = styled.div`
  width: 100%;
  height: 7vw;

  ${media.giant`
    height: 7vw;
  `};

  ${media.tablet`
    height: 15vw;
  `};

  ${media.phone`
    height: 25vw;
  `};
`;

export default ({ styled, origin, style }) => (
  <div>
    <Row key="styled" style={{ marginBottom: "1px" }}>
      <Col span={24}>
        <OutputImage>
          <ImageZoom
            image={{
              src: styled,
              style: {
                width: "100%",
                height: "100%"
              },
              alt: "Styled Image"
            }}
            zoomImage={{
              src: styled,
              alt: "StyledImage"
            }}
          />
        </OutputImage>
      </Col>
    </Row>
    <Row key="origin">
      <Col span={12} style={{ paddingRight: "1px" }}>
        <InputImage>
          <ImageZoom
            image={{
              src: origin,
              style: {
                width: "100%",
                height: "100%"
              },
              alt: "Origin Image"
            }}
            zoomImage={{
              src: origin,
              alt: "Origin Image"
            }}
          />
        </InputImage>
      </Col>
      <Col span={12} style={{ paddingLeft: "1px" }}>
        <InputImage>
          <ImageZoom
            image={{
              src: style,
              style: {
                width: "100%",
                height: "100%"
              },
              alt: "Style Image"
            }}
            zoomImage={{
              src: style,
              alt: "Style Image"
            }}
          />
        </InputImage>
      </Col>
    </Row>
  </div>
);
