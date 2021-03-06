import React from "react";

import { storiesOf } from "@storybook/react";
import Cases from "./Cases";

const CASES = [
  {
    styled:
      "https://images-sophon.s3.amazonaws.com/uploads/pimage/imageurl/4367/thumb400_img17110117334328a592b909.jpg",
    origin:
      "https://images-sophon.s3.amazonaws.com/uploads/content/image/2549/thumb400_img.jpg",
    style:
      "https://images-sophon.s3.amazonaws.com/uploads/style/image/107/thumb200_img.jpg"
  },
  {
    styled:
      "https://images-sophon.s3.amazonaws.com/uploads/pimage/imageurl/4363/thumb400_img17103117164679d9c1215c.jpg",
    origin:
      "https://images-sophon.s3.amazonaws.com/uploads/content/image/2546/thumb400_img.jpg",
    style:
      "https://images-sophon.s3.amazonaws.com/uploads/style/image/99/thumb200_img170317024859347d36b6ab.jpeg"
  },
  {
    styled:
      "https://images-sophon.s3.amazonaws.com/uploads/pimage/imageurl/4360/thumb400_img171030114611e52a92b4b3.jpg",
    origin:
      "https://images-sophon.s3.amazonaws.com/uploads/content/image/2543/thumb400_img.jpg",
    style:
      "https://images-sophon.s3.amazonaws.com/uploads/style/image/51/thumb200_img.jpg"
  }
];

storiesOf("Cases", module).add("cases", () => <Cases cases={CASES} />);
