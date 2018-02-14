import React from "react";

import { storiesOf } from "@storybook/react";
import Case from "./Case";

storiesOf("Case", module).add("case", () => (
  <div style={{ width: "300px" }}>
    <Case
      styled="https://images-sophon.s3.us-west-2.amazonaws.com/output/api/ab6fe1d6-e137-42b8-a6f3-73e012431dfc/Durer/mid/moana.jpg"
      origin="https://images-sophon.s3.us-west-2.amazonaws.com/uploads/api/20180214/377608c5414d7633bde458a6ac10c7d6042281d5/moana.jpg"
      style="http://localhost:3000/style-images/Durer.jpg"
    />
  </div>
));
