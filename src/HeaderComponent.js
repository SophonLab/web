import React from "react";
import styled from "styled-components";
import { media } from "./utils/css";
import { Menu, Icon } from "antd";

const Header = styled.div`
  width: 100%;
  padding: 0;
  line-height: 46px;
  background: url("./header-bg.jpg") no-repeat center center / cover;
`;

const Logo = styled.a`
  display: block;
  font-family: Satisfy;
  font-size: 1.5em;
  padding: 0;
  margin-right: 1em;
  transform: rotate(-5deg);

  &:focus {
    text-decoration: none;
  }

  ${media.phone`
    font-size: 1.2em;
    flex: 1 100%;
  `};
`;

const SloganWrap = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  color: #fff;
  padding: 1.5em 4em;
`;

const Slogan = styled.p`
  font-weight: 250;
  text-transform: uppercase;
  text-align: center;

  font-size: 4em;

  ${media.tablet`
    font-size: 4em;
    padding-top: 1em;
  `} ${media.phone`
    font-size: 1.8em;
  `};
`;

const Lead = styled.p`
  font-weight: 150;
  text-align: center;

  font-size: 2em;

  ${media.tablet`
    font-size: 2em;
  `} ${media.phone`
    font-size: 1.3em;
  `};
`;

const HeaderNavWrap = styled.div`
  padding: 0 4em;
  background: #fff;
  display: flex;
  flex-wrap: wrap;
`;

const HeaderNav = ({ model }) => (
  <HeaderNavWrap>
    <Logo
      href="/"
      onClick={event => {
        event.preventDefault();
        model.pushUrl("/");
      }}
    >
      PhotoPaint
    </Logo>
    <Menu
      onClick={e => {
        if (e.key === "/signout") {
          window.location.href = model.signOutUrl();
        } else if (e.key === "/signin") {
          window.location.href = model.signInUrl();
        } else {
          model.pushUrl(e.key);
        }
      }}
      selectedKeys={[window.location.pathname]}
      mode="horizontal"
    >
      <Menu.Item key="/build">
        <Icon type="edit" />Build
      </Menu.Item>
      <Menu.Item key="/how">
        <Icon type="question-circle" />How it works
      </Menu.Item>
      <Menu.Item key="/pricing">
        <Icon type="calculator" />Pricing
      </Menu.Item>
      <Menu.Item key="/about">
        <Icon type="bulb" />About
      </Menu.Item>
      {model.hasIdentity() ? (
        <Menu.Item key="/signout">
          <Icon type="user" />Sign Out
        </Menu.Item>
      ) : (
        <Menu.Item key="/signin">
          <Icon type="user" />Sign In / Register
        </Menu.Item>
      )}
    </Menu>
  </HeaderNavWrap>
);

export default ({ model, showSlogan = false }) => (
  <Header>
    <HeaderNav model={model} />
    {showSlogan && (
      <SloganWrap>
        <Slogan>High resolution artworks transformed from your photos</Slogan>
        <Lead>Repaint Ultra HD pictures in style of your favorite artists</Lead>
      </SloganWrap>
    )}
  </Header>
);
