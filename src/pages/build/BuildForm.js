import React from "react";
import StyleChooser from "./StyleChooser";
import { Section, SectionSlogan } from "../../elements";
import { Button, Upload, Icon, Form, Radio, Tooltip, Spin, Alert } from "antd";
const Dragger = Upload.Dragger;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 }
};

export default function BuildForm({
  isBuilding,
  hasError,
  errorMessage,
  uploadUrl,
  selectedStyle,
  onSetSelectedStyle,
  mixingLevel,
  onSetMixingLevel,
  onBuild
}) {
  return (
    <Section>
      <SectionSlogan>Build Your Photo Into An Artwork</SectionSlogan>
      <Spin
        size="large"
        tip="Working hard to build the art work..."
        spinning={isBuilding}
      >
        <Form onSubmit={() => {}}>
          {hasError && (
            <Form.Item label="Error" {...formItemLayout}>
              <Alert message={errorMessage} type="error" />
            </Form.Item>
          )}
          <Form.Item label="Photo" {...formItemLayout}>
            <Dragger
              multiple={false}
              action={uploadUrl}
              name="image"
              onChange={info => {
                const status = info.file.status;
                if (status !== "uploading") {
                  console.log(info.file, info.fileList);
                }
                if (status === "done") {
                  console.log(`${info.file.name} file uploaded successfully.`);
                } else if (status === "error") {
                  console.log(`${info.file.name} file upload failed.`);
                }
              }}
            >
              <p className="ant-upload-drag-icon">
                <Icon type="picture" />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
            </Dragger>
          </Form.Item>
          <Form.Item label="Style" {...formItemLayout}>
            <StyleChooser
              selectedStyle={selectedStyle}
              onStyleClick={onSetSelectedStyle}
            />
          </Form.Item>
          <Form.Item
            label={
              <Tooltip title="Higher mixing level will lead to stronger stylization effect.">
                Mixing Level
                <Icon type="question-circle-o" style={{ marginLeft: ".5em" }} />
              </Tooltip>
            }
            {...formItemLayout}
          >
            <Radio.Group
              onChange={e => {
                onSetMixingLevel(e.target.value);
              }}
              value={mixingLevel}
            >
              <Radio.Button value="low">Low</Radio.Button>
              <Radio.Button value="mid">Medium</Radio.Button>
              <Radio.Button value="high">High</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={e => {
                e.preventDefault();
                onBuild();
              }}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </Section>
  );
}
