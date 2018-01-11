import React from "react";
import { Section, SectionSlogan } from "../../elements";
import { Col, Upload, Icon } from "antd";
const Dragger = Upload.Dragger;

export default ({ model }) => (
  <div>
    <Section>
      <Col span={11} style={{ minWidth: "20em", marginBottom: "2em" }}>
        <SectionSlogan>Photo</SectionSlogan>
        <Dragger>
          <p className="ant-upload-drag-icon">
            <Icon type="picture" />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload.{" "}
          </p>
        </Dragger>
      </Col>
      <Col span={2} />
      <Col span={11} style={{ minWidth: "20em", marginBottom: "2em" }}>
        <SectionSlogan>Style</SectionSlogan>
        <Dragger>
          <p className="ant-upload-drag-icon">
            <Icon type="picture" />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload.{" "}
          </p>
        </Dragger>
      </Col>
    </Section>
  </div>
);
