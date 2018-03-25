import React from "react";
import StyleChooser from "./StyleChooser";
import { Section, SectionSlogan } from "../../elements";
import {
  Button,
  Upload,
  Icon,
  Form,
  Radio,
  Tooltip,
  Spin,
  Alert,
  Tabs,
  message
} from "antd";
import debug from "debug";

const buildDebug = debug("web:component:build");

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 }
};

function UploadButton() {
  return (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">Upload</div>
    </div>
  );
}

export default function BuildForm({
  isBuilding,
  onBuild,
  showError,
  criticalError,
  accessToken,
  uploadUrl,
  originImageUrl,
  onOriginalImageUploadSucceed,
  onOriginalImageUploadFailed,
  onOriginalImageUploadReset,
  styleType,
  onStyleTypeChange,
  styleImageUrl,
  onStyleImageUploadSucceed,
  onStyleImageUploadFailed,
  onStyleImageUploadReset,
  selectedStyle,
  onSetSelectedStyle,
  mixingLevel,
  onSetMixingLevel
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
            validationStatus={originImageUrl ? "success" : "error"}
            help={
              showError && !originImageUrl ? "Please choose an image" : null
            }
            {...formItemLayout}
          >
            <Upload
              action={uploadUrl}
              name="image"
              headers={{
                Authorization: `Bearer ${accessToken}`
              }}
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              onChange={({ file }) => {
                buildDebug("on original image change", file);

                if (file.status === "done") {
                  onOriginalImageUploadSucceed(file.response.imgUrl);
                } else if (file.status === "error") {
                  message.warning(
                    "Your session is expired, current page will be refreshed automatically in a few seconds to acquire a new session for you. Please retry upload when you're back here."
                  );
                  setTimeout(onOriginalImageUploadFailed, 8000);
                }
              }}
              onRemove={file => {
                onOriginalImageUploadReset();
              }}
            >
              {originImageUrl ? (
                <img
                  src={originImageUrl}
                  alt="Original"
                  style={{ width: "100%" }}
                />
              ) : (
                <UploadButton />
              )}
            </Upload>
          </Form.Item>
          <Form.Item
            label="Style"
            validationStatus={selectedStyle ? "success" : "error"}
            help={
              showError &&
              ((styleType === "system" && selectedStyle === null) ||
                (styleType === "custom" && styleImageUrl === null))
                ? "Please choose a style"
                : ""
            }
            {...formItemLayout}
          >
            <Tabs activeKey={styleType} onChange={onStyleTypeChange}>
              <Tabs.TabPane
                tab={
                  <span>
                    <Icon type="database" />Predefined
                  </span>
                }
                key="system"
              >
                <StyleChooser
                  selectedStyle={selectedStyle}
                  onStyleClick={onSetSelectedStyle}
                />
              </Tabs.TabPane>
              <Tabs.TabPane
                tab={
                  <span>
                    <Icon type="heart-o" />Your Own
                  </span>
                }
                key="custom"
              >
                <Upload
                  action={uploadUrl}
                  name="image"
                  headers={{
                    Authorization: `Bearer ${accessToken}`
                  }}
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  onChange={({ file }) => {
                    buildDebug("on style image change", file);

                    if (file.status === "done") {
                      onStyleImageUploadSucceed(file.response.imgUrl);
                    } else if (file.status === "error") {
                      message.warning(
                        "Your session is expired, current page will be refreshed automatically in a few seconds to acquire a new session for you. Please retry upload when you're back here."
                      );
                      setTimeout(onStyleImageUploadFailed, 5000);
                    }
                  }}
                  onRemove={file => {
                    onStyleImageUploadReset();
                  }}
                >
                  {styleImageUrl ? (
                    <img
                      src={styleImageUrl}
                      alt="Style"
                      style={{ width: "100%" }}
                    />
                  ) : (
                    <UploadButton />
                  )}
                </Upload>
              </Tabs.TabPane>
            </Tabs>
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
