import React from "react";
import { Section } from ".";
import { Row, Button, Icon, Alert } from "antd";

export default ({ hasIdentity, signInUrl, children }) => {
  if (hasIdentity) {
    return children;
  } else {
    return (
      <Section>
        <Alert
          message="Identity is required for current page"
          type="warning"
          showIcon
        />
        <Row style={{ marginTop: "1.5em" }}>
          <Button
            type="primary"
            size="large"
            onClick={event => {
              event.preventDefault();
              window.location.href = signInUrl;
            }}
          >
            <Icon type="user" />Sign In / Register
          </Button>
        </Row>
      </Section>
    );
  }
};
