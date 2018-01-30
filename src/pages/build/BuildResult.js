import React from "react";
import { Case, Section, SectionSlogan } from "../../elements";
import { Button } from "antd";

export default function BuildResult({ origin, styled, style, onBuildAgain }) {
  return (
    <Section>
      <SectionSlogan>Here is Your Artwork</SectionSlogan>
      <Case styled={styled} origin={origin} style={style} />
      <Button
        type="primary"
        htmlType="submit"
        style={{ marginTop: "2em" }}
        onClick={e => {
          e.preventDefault();
          onBuildAgain();
        }}
      >
        Build Again
      </Button>
    </Section>
  );
}
