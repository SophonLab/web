import React from 'react';
import { Section, SectionSlogan, SectionLead } from '../../elements';
import { Cases, Case } from './CasesComponent';
import { Row, Col, Steps } from 'antd';

export default ({ model }) => (
  <div>
    <Section>
      <SectionSlogan>Turn any photo into an artwork – for free!</SectionSlogan>
      <SectionLead>We use an algorithm inspired by the human brain. It uses the stylistic elements of one image to draw the content of another. Get your own artwork in just three steps.</SectionLead>

      <Row style={ { marginTop: '1em' } }>
        <Steps current={3}>
          <Steps.Step title="Upload photo" description="The first picture defines the scene you would like to have painted." />
          <Steps.Step title="Choose style" description="Choose among predefined styles or upload your own style image." />
          <Steps.Step title="Submit" description="Our servers paint the image for you. You get an email when it's done." />
        </Steps>
      </Row>
      <Row style={ { height: '160px', overflow: 'hidden', marginTop: '1em' } }>
        <Col span={ 6 }>
          <img
            src="https://images-sophon.s3.amazonaws.com/uploads/content/image/2553/thumb400_img.jpg"
            style={ { width: '100%', height: 'auto' } }
          />
        </Col>
        <Col span={ 3 }>
        </Col>
        <Col span={ 6 }>
          <img
            src="https://images-sophon.s3.amazonaws.com/uploads/style/image/2/thumb200_img.jpg"
            style={ { width: '100%', height: 'auto' } }
          />
        </Col>
        <Col span={ 3 }>
        </Col>
        <Col span={ 6 }>
          <img
            src="https://images-sophon.s3.amazonaws.com/uploads/pimage/imageurl/4371/thumb400_img171106023740a6df594674.jpg"
            style={ { width: '100%', height: 'auto' } }
          />
        </Col>
      </Row>
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
      <SectionLead>Get news from the world of art and science and recieve the best DeepArts.</SectionLead>
    </Section>
  </div>
);
