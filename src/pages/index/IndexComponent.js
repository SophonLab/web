import React from "react";
import {
  Section,
  SectionSlogan,
  SectionLead,
  SectionParagraph,
  Cases
} from "../../elements";
import Steps from "./StepsComponent";
import Resolutions from "./ResolutionsComponent";

export default ({ model }) => (
  <div>
    <Section>
      <SectionSlogan>Turn any photo into an artwork</SectionSlogan>
      <SectionLead>
        We use an algorithm inspired by the human brain. It uses the stylistic
        elements of one image to draw the content of another. Get your own
        artwork in just three steps.
      </SectionLead>

      <Steps model={model} />
    </Section>
    <Section style={{ background: "#ececec" }}>
      <SectionSlogan>High Resolution File</SectionSlogan>
      <SectionLead>Do with it whatever you want.</SectionLead>

      <SectionParagraph>
        Get a high-resolution image file for personal use. Whether you print it
        on a t-shirt, canvas or just use it as your screen background – it's
        entirely up to you. In addition to the free standard images, we offer
        two different sizes of HD images.
      </SectionParagraph>

      <Resolutions model={model} />
    </Section>
    <Section>
      <SectionSlogan>Get some inspiration</SectionSlogan>
      <SectionLead>
        See what others have created. Our users' gallery is updated on a daily
        basis.
      </SectionLead>
      <Cases cases={model.cases} />
    </Section>
  </div>
);

// <Section>
//   <SectionSlogan>Follow us</SectionSlogan>
//   <SectionLead>Get news from the world of art and science and recieve the best PhotoPaints.</SectionLead>
// </Section>
