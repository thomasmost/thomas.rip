import styled from '@emotion/styled';
import React from 'react';

const H1 = styled.h1`
  font-family: AcademyEngravedLetPlain, Academy Engraved LET, Garamond, serif;
  font-weight: 400;
  margin-bottom: 0;
  @media (max-width: 700px) {
    margin-bottom: 20px;
  }
`;

const Title: React.FC = () => <H1>Thomas Constantine Moore is dead.</H1>;

export default Title;
