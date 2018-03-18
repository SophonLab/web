import { downloadName } from "./BuildResult";

test("generate download name", () => {
  expect(
    downloadName(
      "http://abc.com/a/b.png",
      "/style-images/chinese_flowers_butterfly.jpg"
    )
  ).toBe("b-chinese_flowers_butterfly.png");
});
