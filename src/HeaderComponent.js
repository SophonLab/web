import React from "react";
import styled from "styled-components";
import { media } from "./utils/css";

const Header = styled.div`
  width: 100%;
  padding: 0;
  line-height: 5em;
  background: url("./header-bg.jpg") no-repeat center center / cover;
`;

const Logo = styled.a`
  display: block;
  font-family: Satisfy;
  font-size: 1.5em;
  padding: 0;
  transform: rotate(-7deg);

  &:focus {
    text-decoration: none;
  }

  ${media.phone`
    font-size: 1.2em;
    flex: 1 100%;
  `};
`;

const NavLink = styled.a`
  display: block;
  line-height: 3.85em;
  padding: 0 1em;
  font-size: 1.3em;

  &:focus {
    text-decoration: none;
  }

  ${media.phone`
    flex: 1 100%;
    padding: 0;
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

    <NavLink
      key="build"
      href="/build"
      onClick={event => {
        event.preventDefault();
        model.pushUrl("/build");
      }}
      style={{ fontWeight: "500", textDecoration: "underline" }}
    >
      Build
    </NavLink>
    <NavLink
      key="how"
      href="/how"
      onClick={event => {
        event.preventDefault();
        model.pushUrl("/how");
      }}
    >
      How it works
    </NavLink>
    <NavLink
      key="pricing"
      href="/pricing"
      onClick={event => {
        event.preventDefault();
        model.pushUrl("/pricing");
      }}
    >
      Pricing
    </NavLink>
    <NavLink
      key="about"
      href="/about"
      onClick={event => {
        event.preventDefault();
        model.pushUrl("/about");
      }}
    >
      About
    </NavLink>
    {model.hasIdentity() ? (
      <NavLink key="logout" right href={model.signOutUrl()}>
        Log Out
      </NavLink>
    ) : (
      <NavLink key="signin" right href={model.signInUrl()}>
        Sign In / Register
      </NavLink>
    )}
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
