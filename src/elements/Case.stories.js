import React from "react";

import { storiesOf } from "@storybook/react";
import Case from "./Case";

storiesOf("Case", module).add("case", () => (
  <div style={{ width: "300px" }}>
    <Case
      styled="https://images-sophon.s3.amazonaws.com/uploads/pimage/imageurl/4367/thumb400_img17110117334328a592b909.jpg"
      origin="https://images-sophon.s3.amazonaws.com/uploads/content/image/2549/thumb400_img.jpg"
      style="https://images-sophon.s3.amazonaws.com/uploads/style/image/107/thumb200_img.jpg"
    />
  </div>
));
