import React from "react";
import styled from "styled-components";
import { media } from "../../utils/css";
import { Row, Button } from "antd";

const Steps = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;

  ${media.phone`
    flex-direction: column;
  `};
`;

const Step = styled.div`
  height: 15em;
  flex: 1 auto;

  ${media.giant`
    height: 36em;
  `} ${media.desktop`
    height: 27em;
  `};
`;

const StepTitle = styled.div`
  line-height: 2em;
  height: 2em;
  font-size: 2em;
  font-weight: 300;
`;

const StepImage = styled.img`
  height: 12em;
  overflow: hidden;

  ${media.giant`
    height: 33em;
  `} ${media.desktop`
    height: 24em;
  `};
`;

export default ({ model }) => (
  <div>
    <Steps>
      <Step position="left">
        <StepTitle>1. Upload photo</StepTitle>
        <StepImage
          src="https://images-sophon.s3.amazonaws.com/uploads/content/image/2553/thumb400_img.jpg"
          alt="Origin"
        />
      </Step>

      <Step position="center">
        <StepTitle>2. Choose style</StepTitle>
        <StepImage
          src="https://images-sophon.s3.amazonaws.com/uploads/style/image/2/thumb200_img.jpg"
          alt="Style"
        />
      </Step>

      <Step position="right">
        <StepTitle>3. Submit</StepTitle>
        <StepImage
          src="https://images-sophon.s3.amazonaws.com/uploads/pimage/imageurl/4371/thumb400_img171106023740a6df594674.jpg"
          alt="Styled"
        />
      </Step>
    </Steps>

    <Row style={{ marginTop: "1.5em" }}>
      <Button
        type="primary"
        size="large"
        onClick={event => {
          event.preventDefault();
          model.pushUrl("/build");
        }}
      >
        Try it Now
      </Button>
    </Row>
  </div>
);
