import React from "react";
import styled from "styled-components";
import { Icon, Card, List, Tooltip } from "antd";
import { replace } from "lodash";
import ProgressiveImage from "react-progressive-image";

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

function StyleCover({ enable, children, title }) {
  if (enable) {
    return (
      <Tooltip title={title}>
        <div style={{ position: "relative" }}>
          <div style={{ opacity: "0.5" }}>{children}</div>
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
      </Tooltip>
    );
  } else {
    return <Tooltip title={title}>{children}</Tooltip>;
  }
}

function humanize(style) {
  return replace(replace(style, /_/g, " "), /-/g, " ");
}

function StyleChooseImage({ style, selected, onClick }) {
  return (
    <StyleCover enable={selected} title={humanize(style)}>
      <Card
        hoverable
        style={{
          width: 100,
          padding: "8px",
          border: "1px dashed #ccc",
          borderRadius: "4px"
        }}
        cover={
          <ProgressiveImage
            src={`/style-images/${style}.jpg`}
            placeholder="loader.gif"
          >
            {src => <StyleImage src={src} alt={style} />}
          </ProgressiveImage>
        }
        onClick={onClick}
      />
    </StyleCover>
  );
}

export default function StyleChooser({ selectedStyle, onStyleClick }) {
  return (
    <StyleContainer>
      <List
        grid={{ gutter: 16, xs: 2, sm: 2, md: 3, lg: 4, xl: 5, xxl: 5 }}
        dataSource={STYLES}
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
