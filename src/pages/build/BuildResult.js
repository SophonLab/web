import React from "react";
import { Case, Section, SectionSlogan } from "../../elements";
import { Button } from "antd";
import { split, last } from "lodash";

export function downloadName(styled, style) {
  const styledFilename = last(split(styled, '/'));

  const styledExtension = last(split(styledFilename, '.'));
  const styledName = styledFilename.substring(0, styledFilename.length - styledExtension.length - 1);

  const styleFilename = last(split(style, '/'));
  const styleExtension = last(split(styleFilename, '.'));
  const styleName = styleFilename.substring(0, styleFilename.length - styleExtension.length - 1);

  return `${styledName}-${styleName}.${styledExtension}`;
}

export default function BuildResult({ origin, styled, style, onBuildAgain }) {
  return (
    <Section>
      <SectionSlogan>Great! Here is Your Artwork</SectionSlogan>
      <Case styled={styled} origin={origin} style={style} />
      <Button.Group style={{ marginTop: "2em" }}>
        <Button
          htmlType="a"
          download={downloadName(styled, style)}
          href={styled}
          type="primary"
          icon="download"
        >
          Download
        </Button>
        <Button
          htmlType="a"
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
