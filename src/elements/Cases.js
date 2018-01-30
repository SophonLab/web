import React from "react";
import { List } from "antd";
import Case from "./Case";

export default ({ cases }) => (
  <List
    grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }}
    dataSource={cases}
    renderItem={item => (
      <List.Item>
        <Case {...item} />
      </List.Item>
    )}
  />
);
