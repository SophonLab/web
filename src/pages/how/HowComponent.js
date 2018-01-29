import React from "react";
import { Section, SectionSlogan, SectionParagraph } from "../../elements";

export default ({ model }) => (
  <Section>
    <SectionSlogan>Fast Transform</SectionSlogan>

    <SectionParagraph>
      <img src="how-machine-learning.jpg" alt="Machine Learning" width="100%" />
    </SectionParagraph>
    <SectionParagraph>
      We use machine learning to train a model, which takes an original image,
      and returns a styled image. Once trained, the transform runs very quick
      with a model, and the result are good enough for ordinary usage. But due
      to limited number of training samples, the result may still not be as good
      as what professionals expect them to be.
    </SectionParagraph>
    <SectionParagraph>
      <strong>Pros:</strong> Fast and Cheap
    </SectionParagraph>
    <SectionParagraph>
      <strong>Cons:</strong> So-so Quality
    </SectionParagraph>

    <SectionSlogan>Deep Transform</SectionSlogan>
    <SectionParagraph>
      <img src="how-iteration.jpg" alt="Iteration" width="100%" />
    </SectionParagraph>
    <SectionParagraph>
      We define a distance, which is the degree of differences between the
      styled image to the original image and to the style image. Then we run
      tons of iterations with small mutations, pick the best mutation from each
      iteration that has almost equal distance to both the original image and
      the style image. Keep the iterations going, we will get better and better
      quality images that contains elements from both the original image and the
      style image.
    </SectionParagraph>
    <SectionParagraph>
      <strong>Pros:</strong> Excellent Quality
    </SectionParagraph>
    <SectionParagraph>
      <strong>Cons:</strong> Slow and Consumes a lot of computing powers
    </SectionParagraph>
  </Section>
);
