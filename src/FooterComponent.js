import React from "react";
import { Layout, Icon } from "antd";
import styled from "styled-components";
const { Footer } = Layout;

const FooterNavList = styled.ul`
  padding-top: 15px;
  padding-bottom: 15px;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`;

const FooterNavItem = styled.li`
  list-style: none;
  margin-right: 17px;
`;

const FooterNavLink = styled.a`
`;

export default ({ pushUrl }) => (
  <Footer style={{ textAlign: "center" }}>
    <FooterNavList>
      <FooterNavItem>
        <FooterNavLink
          href="/about"
          onClick={e => {
            e.preventDefault();
            pushUrl("/about");
          }}
        >
          About
        </FooterNavLink>
      </FooterNavItem>
      <FooterNavItem>
        <FooterNavLink
          href="/pricing"
          onClick={e => {
            e.preventDefault();
            pushUrl("/pricing");
          }}
        >
          Pricing
        </FooterNavLink>
      </FooterNavItem>
      <FooterNavItem>
        <FooterNavLink href="mailto:photopaint.us@gmail.com">
          Contact Us
        </FooterNavLink>
      </FooterNavItem>
      <FooterNavItem>
        <FooterNavLink
          href="/privacy"
          onClick={e => {
            e.preventDefault();
            pushUrl("/privacy");
          }}
        >
          Privacy
        </FooterNavLink>
      </FooterNavItem>
    </FooterNavList>
    ©2017 Sophon LLC.
  </Footer>
);
