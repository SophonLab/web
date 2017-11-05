import React from 'react';
import { observer } from 'mobx-react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import IndexComponent from './pages/index/IndexComponent';
import AboutComponent from './pages/about/AboutComponent';
import PricingComponent from './pages/pricing/PricingComponent';
import HowComponent from './pages/how/HowComponent';
import NotFoundComponent from './pages/not-found/NotFoundComponent';
import { Layout } from 'antd';
const { Content } = Layout;

const RenderContent = ({ model }) => {
  if (model.pages['/']) {
    return <IndexComponent model={ model.pages['/'] } />;
  } else if (model.pages['/how']) {
    return <HowComponent model={ model.pages['/how'] } />;
  } else if (model.pages['/pricing']) {
    return <PricingComponent model={ model.pages['/pricing'] } />;
  } else if (model.pages['/about']) {
    return <AboutComponent model={ model.pages['/about'] } />;
  } else if (model.pages['/404']) {
    return <NotFoundComponent model={ model.pages['/404'] } />;
  } else {
    return <div>Loading...</div>;
  }
};

export default observer(({ model }) => {
  return (
    <Layout>
      <Header model={ model } showSlogan={ model.pages['/'] } />
      <Content style={ { background: '#fff' } }>
        <RenderContent model={ model } />
      </Content>
      <Footer />
    </Layout>
  );
});

