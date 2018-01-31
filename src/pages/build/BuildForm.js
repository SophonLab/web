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
  showError,
  criticalError,
  uploadUrl,
  originImageId,
  selectedStyle,
  onSetSelectedStyle,
  mixingLevel,
  onSetMixingLevel,
  onBuild,
  onUploadSucceed,
  onUploadReset
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
          {criticalError && (
            <Form.Item label="Critical Error" {...formItemLayout}>
              <Alert message={criticalError} type="error" />
            </Form.Item>
          )}
          <Form.Item
            label="Photo"
            validationStatus={originImageId ? "success" : "error"}
            help={showError && !originImageId ? "Please choose an image" : null}
            {...formItemLayout}
          >
            <Dragger
              multiple={false}
              action={uploadUrl}
              name="image"
              onChange={({ file }) => {
                if (file.status === "done") {
                  onUploadSucceed(file.response.imgId, file.response.imgUrl);
                }
              }}
              onRemove={file => {
                onUploadReset();
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
          <Form.Item
            label="Style"
            validationStatus={selectedStyle ? "success" : "error"}
            help={showError && !selectedStyle ? "Please choose a style" : ""}
            {...formItemLayout}
          >
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
