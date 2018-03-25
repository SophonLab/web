import React from "react";
import { observer } from "mobx-react";
import { RequireIdentity } from "./elements";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import IndexComponent from "./pages/index/IndexComponent";
import AboutComponent from "./pages/about/AboutComponent";
import PricingComponent from "./pages/pricing/PricingComponent";
import PrivacyComponent from "./pages/privacy/PrivacyComponent";
import HowComponent from "./pages/how/HowComponent";
import BuildComponent from "./pages/build/BuildComponent";
import NotFoundComponent from "./pages/not-found/NotFoundComponent";
import { Layout } from "antd";
const { Content } = Layout;

const RenderContent = ({ model }) => {
  if (model.location.pathname === "/") {
    return <IndexComponent model={model.page} />;
  } else if (model.location.pathname === "/how") {
    return <HowComponent model={model.page} />;
  } else if (model.location.pathname === "/build") {
    return (
      <RequireIdentity
        hasIdentity={model.hasIdentity()}
        signInUrl={model.signInUrl()}
      >
        <BuildComponent model={model.page} />
      </RequireIdentity>
    );
  } else if (model.location.pathname === "/pricing") {
    return <PricingComponent model={model.page} />;
  } else if (model.location.pathname === "/privacy") {
    return <PrivacyComponent model={model.page} />;
  } else if (model.location.pathname === "/about") {
    return <AboutComponent model={model.page} />;
  } else if (model.location.pathname === "/404") {
    return <NotFoundComponent model={model.page} />;
  } else {
    return <div>Loading...</div>;
  }
};

export default observer(({ model }) => {
  return (
    <Layout>
      <Header model={model} showSlogan={model.location.pathname === "/"} />
      <Content style={{ background: "#fff" }}>
        <RenderContent model={model} />
      </Content>
      <Footer identity={model.identity} pushUrl={model.pushUrl} />
    </Layout>
  );
});
