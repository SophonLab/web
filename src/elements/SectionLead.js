import styled from 'styled-components';
import { media } from '../utils/css';

const SectionLead = styled.p`
  font-size: 2em;

  ${media.phone`
    font-size: 1.5em;
  `}
`;

export default SectionLead;
