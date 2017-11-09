import React from 'react';
import { Row, Col } from 'antd';

export const Cases = Row;

export const Case = ({ styled, origin, style }) => (
  <Col key={ styled } span={ 8 } style={ { marginBottom: '1.5em', paddingRight: '1em' } }>
    <Row key="styled">
      <Col span={ 24 }>
        <img
          src={ styled }
          alt="Styled"
          style={ { width: '100%', height: 'auto' } }
        />
      </Col>
    </Row>
    <Row key="origin">
      <Col span={ 12 } style={ { paddingRight: '.3em' } }>
        <img
          src={ origin }
          alt="Origin"
          style={ { width: '100%', height: 'auto' } }
        />
      </Col>
      <Col span={ 12 } style={ { paddingLeft: '.3em' } }>
        <img
          src={ style }
          alt="Style"
          style={ { width: '100%', height: 'auto' } }
        />
      </Col>
    </Row>
  </Col>
);
