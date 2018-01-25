import React from "react";
import { Section, SectionLead } from ".";
import { Row, Button } from "antd";

export default ({ model, children }) => {
  if (model.hasIdentity()) {
    return children;
  } else {
    return (
      <Section>
        <SectionLead>Identity is required for current page</SectionLead>
        <Row style={{ marginTop: "1.5em" }}>
          <Button
            type="primary"
            size="large"
            onClick={event => {
              event.preventDefault();
              window.location.href = model.signInUrl();
            }}
          >
            Sign In / Register
          </Button>
        </Row>
      </Section>
    );
  }
};
