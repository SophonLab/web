import styled from "styled-components";
import { media } from "../utils/css";

const SectionSlogan = styled.p`
  font-weight: 200;
  font-size: 3em;
  text-transform: uppercase;

  ${media.phone`
    font-size: 2em;
  `};
`;

export default SectionSlogan;
