import styled from "styled-components";
import { media } from "../utils/css";

const SectionParagraph = styled.p`
  font-size: 1.3em;

  ${media.phone`
    font-size: 1.2em;
  `};
`;

export default SectionParagraph;
