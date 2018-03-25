import React from "react";
import { Row, Col } from "antd";
import styled from "styled-components";
import ImageZoom from "react-medium-image-zoom";
import ProgressiveImage from "react-progressive-image";

function aspectRatioToPercentage(aspectRatio) {
  const [w, h] = aspectRatio.split(":");

  return (100 * h / w).toFixed(2) + "%";
}

const ImageContainer = styled.div`
  width: 100%;
  position: relative;
  padding-top: ${props => aspectRatioToPercentage(props.aspectRatio || "16:9")};
  overflow: hidden;
  background: #ddd;
`;

const contentStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  width: "100%",
  margin: "auto"
};

export default ({ styled, origin, style }) => (
  <div>
    <Row key="styled" style={{ marginBottom: "1px" }}>
      <Col span={24}>
        <ImageContainer aspectRatio="16:9">
          <ProgressiveImage src={styled} placeholder="loader.gif">
            {src => (
              <ImageZoom
                image={{
                  src,
                  style: contentStyle,
                  alt: "Styled Image"
                }}
                zoomImage={{
                  src,
                  alt: "Styled Image"
                }}
              />
            )}
          </ProgressiveImage>
        </ImageContainer>
      </Col>
    </Row>
    <Row key="origin">
      <Col span={12} style={{ paddingRight: "1px" }}>
        <ImageContainer aspectRatio="2:1">
          <ProgressiveImage src={origin} placeholder="loader.gif">
            {src => (
              <ImageZoom
                image={{
                  src,
                  style: contentStyle,
                  alt: "Origin Image"
                }}
                zoomImage={{
                  src,
                  alt: "Origin Image"
                }}
              />
            )}
          </ProgressiveImage>
        </ImageContainer>
      </Col>
      <Col span={12} style={{ paddingLeft: "1px" }}>
        <ImageContainer aspectRatio="2:1">
          <ProgressiveImage src={style} placeholder="loader.gif">
            {src => (
              <ImageZoom
                image={{
                  src,
                  style: contentStyle,
                  alt: "Style Image"
                }}
                zoomImage={{
                  src,
                  alt: "Style Image"
                }}
              />
            )}
          </ProgressiveImage>
        </ImageContainer>
      </Col>
    </Row>
  </div>
);
