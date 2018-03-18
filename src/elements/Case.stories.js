import React from "react";

import { storiesOf } from "@storybook/react";
import Case from "./Case";

storiesOf("Case", module).add("case", () => (
  <div style={{ width: "300px" }}>
    <Case
      styled="https://images-sophon.s3.us-west-2.amazonaws.com/output/api/37f936c8-4b4a-4a57-bd77-165615b6b163/chicago_van-gogh-starry-night.jpg"
      origin="https://images-sophon.s3.us-west-2.amazonaws.com/uploads/api/20180217/23eb63ac8594f6e1249253105301f7736af3f798/chicago.jpg"
      style="https://images-sophon.s3.us-west-2.amazonaws.com/uploads/api/20180217/781a19dfe3e862c8d0a2ffe0bdadeb0e5a17bafd/van-gogh-starry-night.jpg"
    />
  </div>
));
