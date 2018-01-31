import React from "react";
import { Case, Section, SectionSlogan } from "../../elements";
import { Button } from "antd";

export default function BuildResult({ origin, styled, style, onBuildAgain }) {
  return (
    <Section>
      <SectionSlogan>Great! Here is Your Artwork</SectionSlogan>
      <Case styled={styled} origin={origin} style={style} />
      <Button.Group style={{ marginTop: "2em" }}>
        <Button
          type="primary"
          icon="download"
          onClick={e => {
            e.preventDefault();
            window.open(styled);
          }}
        >
          Download
        </Button>
        <Button
          onClick={e => {
            e.preventDefault();
            onBuildAgain();
          }}
        >
          Build Again
        </Button>
      </Button.Group>
    </Section>
  );
}
