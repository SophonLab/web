import React from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import { Section, SectionSlogan } from "../../elements";
import { Button, Upload, Icon, List, Form, Radio, Card, Tooltip } from "antd";
const Dragger = Upload.Dragger;

const STYLES = [
  "Autumn",
  "Braque_V",
  "Caribbean",
  "Cezanne_Bibemus",
  "Cezanne_III",
  "Claude-Monet-The-Japanese-Footbridge-1899-Painting-onarto",
  "Durer",
  "Gauguin_Haere_Mai",
  "Manet-bar-folies-bergere",
  "Monet_foggy_city",
  "Monet_poppy_field",
  "Monet_woman_with_umbrella",
  "Mother_two_child_trees",
  "Mountains",
  "Oil_Pastel_Portrait",
  "Picasso_foundation",
  "Picasso_the_weeping_woman",
  "Pollock_IV",
  "Renior_the-banks-of-the-river",
  "Renior_women_sit_by_sea",
  "Seaside",
  "Thick_oil_paint",
  "Van_Gogh_Iris",
  "Van_Gogh_market",
  "apartments_bridge_trees",
  "autumn_trees_river",
  "blackwhite_woman",
  "blue_sea_beach_cloud",
  "blue_sea_gold_cloud_boat",
  "brown_wall",
  "building_bridge",
  "canyon_doodle",
  "chinese_chicken",
  "chinese_flowers_butterfly",
  "chinese_mountain_house",
  "colorful_bird",
  "colorful_city",
  "colorful_oil_portrait",
  "colorful_turtle",
  "doodle1",
  "final",
  "impasto-oil-on-canvas-a-woman-of-chinese-opera-enxu-zhou",
  "kid_portrait_black_hair",
  "kid_portrait_watercolor",
  "landscape_Vincent_Van_Gogh_Cypresses",
  "landscape_colorful_tiles",
  "landscape_goldfish",
  "landscape_lake_boat_house",
  "landscape_watercolor_house_flower_trees",
  "landscape_watercolor_river_bridge_trees",
  "modern1",
  "modern2",
  "modern3",
  "modern4",
  "modern5",
  "mosaic_wall",
  "oil_building_cars_rain",
  "oil_cock",
  "oil_drooping",
  "oil_face_color",
  "oil_flower",
  "oil_house",
  "oil_painting_peacok",
  "oil_woman",
  "paintbrush_cat_head",
  "park-nature-painting",
  "pencil_city",
  "picasso-self-portrait-1907",
  "portrait_Vincent_van_Gogh_small",
  "portrait_colortile_man",
  "portrait_man_reading_paper",
  "portrait_oil_man",
  "portrait_oil_man_brown",
  "portrait_vincent_van_gogh_big",
  "poster_bechers",
  "rain_princess",
  "red_sun_palm_tree",
  "sunset_sea",
  "texture_colorful_stripes",
  "texture_copper_circuit",
  "texture_flower_pink",
  "texture_oil_paint",
  "texture_paper_triangles",
  "texture_stone",
  "texture_sun_cloud",
  "texture_water",
  "two_ballet_dancer",
  "two_kid_building",
  "van-gogh-bedroom",
  "watercolor_building",
  "watercolor_flowers_grass",
  "watercolor_portrait",
  "watercolor_portrait_woman",
  "wedding-painting-ann-bailey",
  "wedding_portrait_lake",
  "wedding_watercolor",
  "wedding_watercolor_kiss",
  "winter_road",
  "woman_portrait",
  "world_card_dear"
];

const StyleContainer = styled.div`
  height: 300px;
  overflow-y: scroll;
`;

const StyleImage = styled.img`
  padding: 0.1em;
`;

function StyleCover({ enable, children }) {
  if (enable) {
    return (
      <div style={{ position: "relative" }}>
        <div style={{ opacity: "0.4" }}>{children}</div>
        <Icon
          type="check"
          style={{
            position: "absolute",
            top: 0,
            width: "100px",
            height: "100px",
            display: "block",
            lineHeight: "100px",
            fontSize: 64,
            fontWeight: "bold",
            color: "green"
          }}
        />
      </div>
    );
  } else {
    return children;
  }
}

function StyleChooseImage({ style, selected, onClick }) {
  return (
    <StyleCover enable={selected}>
      <Tooltip title={style}>
        <Card
          hoverable
          style={{ width: 100 }}
          cover={<StyleImage src={`/style-images/${style}.jpg`} alt={style} />}
          onClick={onClick}
        />
      </Tooltip>
    </StyleCover>
  );
}

function StyleChooser({ styles, selectedStyle, onStyleClick }) {
  return (
    <StyleContainer>
      <List
        grid={{ gutter: 16, xs: 2, sm: 2, md: 3, lg: 4, xl: 5, xxl: 5 }}
        dataSource={styles}
        renderItem={style => (
          <List.Item>
            <StyleChooseImage
              style={style}
              selected={style === selectedStyle}
              onClick={() => {
                onStyleClick(style);
              }}
            />
          </List.Item>
        )}
      />
    </StyleContainer>
  );
}

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 }
};

export default observer(function BuildComponent({ model }) {
  return (
    <Section>
      <SectionSlogan>Build Your Photo Into An Artwork</SectionSlogan>
      <Form onSubmit={() => {}}>
        <Form.Item label="Photo" {...formItemLayout}>
          <Dragger
            multiple={false}
            action={model.uploadUrl()}
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
            styles={STYLES}
            selectedStyle={model.selectedStyle}
            onStyleClick={model.setSelectedStyle}
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
              model.setMixingLevel(e.target.value);
            }}
            value={model.mixingLevel}
          >
            <Radio.Button value="low">Low</Radio.Button>
            <Radio.Button value="mid">Medium</Radio.Button>
            <Radio.Button value="high">High</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Section>
  );
});
