import React from 'react';
import { Section, SectionSlogan, SectionLead, SectionParagraph } from '../../elements';
import { Card, Row, Col, Button } from 'antd';
import styled from 'styled-components';

const Price = styled.p`
  font-size: 20px;
  font-weight: 500;
  color: #108ee9;
`;

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
      <Row style={ { marginTop: '1.5em' } }>
        <Button
          type="primary"
          size="large"
          onClick={ (event) => {
            event.preventDefault();
            model.pushUrl('/build');
          } }
        >
          Try it Now
        </Button>
      </Row>
    </Section>
    <Section>
      <SectionSlogan>Pricing</SectionSlogan>
      <SectionLead>
        More options for professionals.
      </SectionLead>
      <Row style={ { marginTop: '1em' } }>
        <Col span={ 8 } style={ { paddingRight: '1em' } }>
          <Card title="Free" bordered>
            <p>Render art works (500*500)</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <Price>Free</Price>
          </Card>
        </Col>
        <Col span={ 8 } style={ { paddingLeft: '.5em', paddingRight: '.5em' } }>
          <Card title="Pro" bordered>
            <p>All features of Free</p>
            <p>Render UHD art works</p>
            <p>Access to desktop app for convenient file access</p>
            <p>&nbsp;</p>
            <Price>$19/month</Price>
          </Card>
        </Col>
        <Col span={ 8 } style={ { paddingLeft: '1em' } }>
          <Card title="Master" bordered>
            <p>All features of Pro</p>
            <p>Render 8K art works</p>
            <p>Tune art works with custom parameters</p>
            <p>&nbsp;</p>
            <Price>$99/month</Price>
          </Card>
        </Col>
      </Row>
    </Section>
  </div>
);
