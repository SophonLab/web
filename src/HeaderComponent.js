import React from 'react';
import styled from 'styled-components';
import { Layout, Row, Col } from 'antd';
const { Header } = Layout;

const Logo = styled.a`
  display: block;
  height: 64px;
  line-height: 64px;
  font-family: Satisfy;
  font-size: 18px;
  transform: rotate(-7deg);

  &:focus {
    text-decoration: none;
  }
`;

const NavLinkL = styled.a`
  display: block;
  height: 64px;
  padding: 0 12px;
  font-size: 16px;
  float: left;

  &:focus {
    text-decoration: none;
  }
`;

const NavLinkR = styled.a`
  display: block;
  height: 64px;
  padding: 0 12px;
  font-size: 16px;
  float: right;

  &:focus {
    text-decoration: none;
  }
`;

const Slogan = styled.p`
  font-weight: 250;
  font-size: 40px;
  text-align: center;
  text-transform: uppercase;
  margin-top: 90px;
`;

const Lead = styled.p`
  font-size: 20px;
  font-weight: 150;
  text-align: center;
`;

const HeaderNav = ({ model }) => (
  <Row style={{ height: '64px', padding: '0 50px', background: '#fff' }}>
    <Col span={ 3 }>
      <Logo
        href="/"
        onClick={ (event) => {
          event.preventDefault();
          model.pushUrl('/');
        } }
      >
        PhotoPaint
      </Logo>
    </Col>

    <Col span={ 13 }>
      <NavLinkL
        key="build"
        href="/build"
        onClick={ (event) => {
          event.preventDefault();
          model.pushUrl('/build');
        } }
        style={ { fontWeight: '500', textDecoration: 'underline' } }
      >
        Build
      </NavLinkL>
      <NavLinkL
        key="how"
        href="/how"
        onClick={ (event) => {
          event.preventDefault();
          model.pushUrl('/how');
        } }
      >
        How it works
      </NavLinkL>
      <NavLinkL
        key="pricing"
        href="/pricing"
        onClick={ (event) => {
          event.preventDefault();
          model.pushUrl('/pricing');
        } }
      >
        Pricing
      </NavLinkL>
      <NavLinkL
        key="about"
        href="/about"
        onClick={ (event) => {
          event.preventDefault();
          model.pushUrl('/about');
        } }
      >
        About
      </NavLinkL>
    </Col>

    {
      !model.hasIdentity() &&
      <Col span={ 8 } style={ { textAlign: 'right' } }>
        <NavLinkR key="signin" href={ model.signInUrl() }>
          Sign In
        </NavLinkR>
        <NavLinkR key="register" href={ model.registerUrl() }>
          Register
        </NavLinkR>
      </Col>
    }
  </Row>
);

function headerStyle(showSlogan) {
  if (showSlogan) {
    return {
      width: '100%',
      background: "url('./header-bg.jpg') no-repeat center center / cover",
      height: '400px',
      padding: '0'
    };
  } else {
    return {
      width: '100%',
      padding: '0'
    };
  }
}

export default ({ model, showSlogan = false }) => (
  <Header style={ headerStyle(showSlogan) }>
    <HeaderNav model={ model } />
    {
      showSlogan &&
      <Row style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', color: '#fff', minHeight: '334px' }}>
        <Slogan>High resolution artworks <br /> transformed from your photos</Slogan>
        <Lead>Repaint Ultra HD pictures in style of your favorite artists</Lead>
      </Row>
    }
  </Header>
);
