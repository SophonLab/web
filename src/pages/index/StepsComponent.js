import React from 'react';
import { Row, Col, Steps, Button } from 'antd';

export default ({ model }) => (
  <div>
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
          alt="Origin"
          style={ { width: '100%', height: 'auto' } }
        />
      </Col>
      <Col span={ 3 }>
      </Col>
      <Col span={ 6 }>
        <img
          src="https://images-sophon.s3.amazonaws.com/uploads/style/image/2/thumb200_img.jpg"
          alt="Style"
          style={ { width: '100%', height: 'auto' } }
        />
      </Col>
      <Col span={ 3 }>
      </Col>
      <Col span={ 6 }>
        <img
          src="https://images-sophon.s3.amazonaws.com/uploads/pimage/imageurl/4371/thumb400_img171106023740a6df594674.jpg"
          alt="Styled"
          style={ { width: '100%', height: 'auto' } }
        />
      </Col>
    </Row>
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
  </div>
);
