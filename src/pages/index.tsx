import React from 'react';
import { PageProps } from 'gatsby';

import Title from '@/components/Title';

import styled from '@emotion/styled';

const BG = styled.main`
  // background-color: black;
`;

const Home: React.FC<PageProps> = () => (
  <BG>
    <Title />
    <p>Thomas Constantine Moore is dead.</p>
    <p>
      Follow me on Twitter (
      <a href="https://twitter.com/thomascmost">@thomascmost</a>)
    </p>
  </BG>
);

export default Home;
