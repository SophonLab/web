import React from 'react';
import { Section, SectionSlogan, SectionParagraph } from '../../elements';

export default ({ model }) => (
  <Section>
    <SectionSlogan>Page Not Found</SectionSlogan>
    <SectionParagraph>
      The page you're looking for does not exist.
    </SectionParagraph>
  </Section>
);
