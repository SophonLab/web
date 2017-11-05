import React from 'react';
import { Section, SectionSlogan, SectionLead, SectionParagraph } from '../../elements';

export default ({ model }) => (
  <Section>
    <SectionSlogan>Get started for free</SectionSlogan>
    <SectionLead>
      Because PhotoPaints are awesome, we work hard to generate them for free.
    </SectionLead>
    <SectionParagraph>
      You can create as many images as you want for free. Because generating them requires a lot of computation power, free images are limited to a size of 500 × 500 pixels and there is a queue.
    </SectionParagraph>
  </Section>
);
