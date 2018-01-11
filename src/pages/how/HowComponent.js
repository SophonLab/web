import React from "react";
import {
  Section,
  SectionLead,
  SectionSlogan,
  SectionParagraph
} from "../../elements";

export default ({ model }) => (
  <Section>
    <SectionSlogan>How</SectionSlogan>

    <SectionLead>Fast Transform</SectionLead>
    <SectionParagraph>
      We used machine learning to train a model, which then takes an original
      image, and returns a styled image. Once trained, the transform runs very
      quick with a model, and the result can be accepted by amateurs. But due to
      limited number of samples, the final result may still not be as good as
      what professionals expect them to be.
    </SectionParagraph>
    <SectionParagraph>
      <strong>Pros:</strong> Fast and Cheap
    </SectionParagraph>
    <SectionParagraph>
      <strong>Cons:</strong> So-so Quality
    </SectionParagraph>

    <SectionLead>Deep Transform</SectionLead>
    <SectionParagraph>
      We define a distance, which is the degree of differences between the
      styled image to the original image and to the style image. Then we run
      tons of iterations, pick the result image from tons of random variations
      that has almost equal distance to both the original image and the style
      image. Keep the iterations going, we will get better and better quality
      images that contains elements from both the original image and the style
      image.
    </SectionParagraph>
    <SectionParagraph>
      <strong>Pros:</strong> Excellent Quality
    </SectionParagraph>
    <SectionParagraph>
      <strong>Cons:</strong> Slow and Consumes a lot of computing powers
    </SectionParagraph>
  </Section>
);
