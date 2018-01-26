import React from "react";
import { Section, SectionSlogan, SectionParagraph } from "../../elements";

export default ({ model }) => (
  <Section>
    <SectionSlogan>About</SectionSlogan>
    <SectionParagraph>
      Our mission is to provide a user friendly painting tool that allows
      everyone to create quality artworks that satisfying themselves.
    </SectionParagraph>
    <SectionParagraph>
      Other than the freely available Fast Transform tool, we're glad to assist
      your customization needs.
    </SectionParagraph>
    <SectionParagraph>
      Any question please feel free to contact us at{" "}
      <a href="mailto:photopaint.us@gmail.com">photopaint.us@gmail.com</a>
    </SectionParagraph>
  </Section>
);
