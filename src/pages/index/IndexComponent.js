import React from 'react';
import { Section, SectionSlogan, SectionLead } from '../../elements';
import { Cases, Case } from './CasesComponent';
import Steps from './StepsComponent';

export default ({ model }) => (
  <div>
    <Section>
      <SectionSlogan>Turn any photo into an artwork – for free!</SectionSlogan>
      <SectionLead>We use an algorithm inspired by the human brain. It uses the stylistic elements of one image to draw the content of another. Get your own artwork in just three steps.</SectionLead>

      <Steps model={ model } />
    </Section>
    <Section style={{ background: '#ececec' }}>
      <SectionSlogan>Get some inspiration</SectionSlogan>
      <SectionLead>See what others have created. Our users' gallery is updated on a daily basis.</SectionLead>
      <Cases style={ { marginTop: '1.5em' } }>
        { model.cases.map(Case) }
      </Cases>
    </Section>
    <Section>
      <SectionSlogan>Follow us</SectionSlogan>
      <SectionLead>Get news from the world of art and science and recieve the best PhotoPaints.</SectionLead>
    </Section>
  </div>
);
