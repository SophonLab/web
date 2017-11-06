import React from 'react';
import { Section, SectionSlogan, SectionLead, SectionParagraph } from '../../elements';
import { Card, Row, Col } from 'antd';

export default ({ model }) => (
  <div>
    <Section style={ { background: '#ececec' } }>
      <SectionSlogan>Get started for free</SectionSlogan>
      <SectionLead>
        Because PhotoPaints are awesome, we work hard to generate them for free.
      </SectionLead>
      <SectionParagraph>
        You can create as many images as you want for free. Because generating them requires a lot of computation power, free images are limited to a size of 500 × 500 pixels and there is a queue.
      </SectionParagraph>
    </Section>
    <Section>
      <SectionSlogan>Pricing</SectionSlogan>
      <SectionLead>
        More options for professionals.
      </SectionLead>
      <Row style={ { marginTop: '1em' } }>
        <Col span={ 8 } style={ { paddingRight: '1em' } }>
          <Card title="Free" bordered>
            <p>Unlimited art works (500*500)</p>
          </Card>
        </Col>
        <Col span={ 8 } style={ { paddingLeft: '.5em', paddingRight: '.5em' } }>
          <Card title="Pro" bordered>
            <p>All features of Free</p>
            <p>Enable UHD art works rendering</p>
            <p>Access to desktop app for convenient file access</p>
          </Card>
        </Col>
        <Col span={ 8 } style={ { paddingLeft: '1em' } }>
          <Card title="Master" bordered>
            <p>All features of Pro</p>
            <p>Enable 8K art works rendering</p>
            <p>Tune art works rendering using custom parameters</p>
          </Card>
        </Col>
      </Row>
    </Section>
  </div>
);
