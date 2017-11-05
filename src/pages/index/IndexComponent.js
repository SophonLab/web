import React from 'react';
import { Row } from 'antd';
import { SectionSlogan, SectionLead } from '../../elements';

export default ({ model }) => (
  <div>
    <Row style={{ padding: 50 }}>
      <SectionSlogan>Turn any photo into an artwork – for free!</SectionSlogan>
      <SectionLead>We use an algorithm inspired by the human brain. It uses the stylistic elements of one image to draw the content of another. Get your own artwork in just three steps.</SectionLead>
    </Row>
    <Row style={{ background: '#ececec', padding: 50 }}>
      <SectionSlogan>Get some inspiration</SectionSlogan>
      <SectionLead>See what others have created. Our users' gallery is updated on a daily basis.</SectionLead>
    </Row>
    <Row style={{ padding: 50 }}>
      <SectionSlogan>Follow us</SectionSlogan>
      <SectionLead>Get news from the world of art and science and recieve the best DeepArts.</SectionLead>
    </Row>
  </div>
);
