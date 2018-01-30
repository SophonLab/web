import React from "react";
import { Row, Button, Badge, List } from "antd";

const STEPS = [
  {
    seq: 1,
    title: "Upload Photo",
    src:
      "https://images-sophon.s3.amazonaws.com/uploads/content/image/2546/thumb400_img.jpg",
    alt: "Origin"
  },
  {
    seq: 2,
    title: "Choose style",
    src:
      "https://images-sophon.s3.amazonaws.com/uploads/style/image/99/thumb200_img170317024859347d36b6ab.jpeg",
    alt: "Style"
  },
  {
    seq: 3,
    title: "Submit",
    src:
      "https://images-sophon.s3.amazonaws.com/uploads/pimage/imageurl/4363/thumb400_img17103117164679d9c1215c.jpg",
    alt: "Styled"
  }
];

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
        <img src={src} alt={alt} style={{ width: "100%", height: "auto" }} />
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
