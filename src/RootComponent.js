import React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;

const SignInLink = styled.a`
  right: 50px;
  top: 0;
  position: absolute;
  color: white;
`;

const LogoAnchor = styled.a`
`;

const Logo = styled.img`
  width: 120px;
  height: 31px;
  border-radius: 6px;
  margin: 16px 24px 16px 0;
  float: left;
`;

const RenderPages = ({ pages }) => {
  if (pages.gallery) {
    return <div>Gallery</div>;
  } else if (pages.blog) {
    return <div>Blog</div>;
  } else if (pages.about) {
    return <div>About</div>;
  } else if (pages.notFound) {
    return <div>Not Found</div>;
  } else {
    return <div>Loading...</div>;
  }
};

export default observer(({ model }) => (
  <Layout className="layout">
    <Header>
      <LogoAnchor
        href="/"
        onClick={ (event) => {
          event.preventDefault();
          model.pushUrl('/');
        } }
      >
        <Logo src="/logo.png" />
      </LogoAnchor>
      <Menu
        mode="horizontal"
        theme="dark"
        selectedKeys={[ model.location.pathname ]}
        onClick={ ({ key }) => { model.pushUrl(key); } }
        style={{ lineHeight: '64px'}}
      >
        <Menu.Item key="/">Gallery</Menu.Item>
        <Menu.Item key="/blog">Blog</Menu.Item>
        <Menu.Item key="/about">About</Menu.Item>
      </Menu>
      {
        !model.hasIdentity() &&
        <SignInLink href={ model.signInUrl() }>
          Sign In
        </SignInLink>
      }
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Gallery</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ background: '#fff', padding: 24, minHeight: 400 }}>
        <div>Has Identity: { model.hasIdentity() ? 'True' : 'False' }</div>
        <RenderPages pages={ model.pages } />
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>
      ©2017 Sophon LLC.
    </Footer>
  </Layout>
));
