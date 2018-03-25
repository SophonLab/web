import React from "react";
import { Row, Button, Badge, List } from "antd";
import styled from "styled-components";
import { media } from "../../utils/css";
import ProgressiveImage from "react-progressive-image";

const STEPS = [
  {
    seq: 1,
    title: "Upload Photo",
    src:
      "https://images-sophon.s3.us-west-2.amazonaws.com/uploads%2Fapi%2F20180101%2F29dabeb2b95d6bbd12afd8c9a16a3d6a2a05a0ec%2FMartinPescador+HighRes.jpg",
    alt: "Origin"
  },
  {
    seq: 2,
    title: "Choose style",
    src:
      "https://images-sophon.s3.us-west-2.amazonaws.com/uploads/api/20180101/8717f13368a61b1f6a589cd754003336b0e7e0bb/Style%20HP%20Highres%20GreenYellow.jpg",
    alt: "Style"
  },
  {
    seq: 3,
    title: "Submit",
    src:
      "https://images-sophon.s3.us-west-2.amazonaws.com/output/api/74f7fc60-4e33-4f04-a1e8-69e888495c0f/2100px_uploads%252Fapi%252F20180101%252F29dabeb2b95d6bbd12afd8c9a16a3d6a2a05a0ec%252FMartinPescador%2BHighRes.jpg",
    alt: "Styled"
  }
];

const StepImage = styled.img`
  width: 100%;
  height: 20vw;

  ${media.giant`
    height: 20vw;
  `};

  ${media.phone`
    height: 50vw;
  `};
`;

function Step({ seq, title, src, alt }) {
  return (
    <div>
      <Row
        style={{
          lineHeight: "1.3em",
          fontSize: "1.3em",
          fontWeight: 400,
          marginBottom: ".5em"
        }}
      >
        <Badge
          count={seq}
          style={{
            backgroundColor: "#1890ff",
            marginRight: "0.5em",
            verticalAlign: "bottom"
          }}
        />
        {title}
      </Row>
      <Row>
        <ProgressiveImage src={src} placeholder="loader.gif">
          {source => <StepImage src={source} alt={alt} />}
        </ProgressiveImage>
      </Row>
    </div>
  );
}

function Steps({ steps }) {
  return (
    <List
      grid={{ gutter: 16, xs: 1, sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 }}
      dataSource={steps}
      renderItem={step => (
        <List.Item>
          <Step {...step} />
        </List.Item>
      )}
    />
  );
}

export default ({ model }) => (
  <div>
    <Steps steps={STEPS} />
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
