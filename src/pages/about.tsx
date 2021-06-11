import React from 'react';
import { PageProps } from 'gatsby';

import Title from '@/components/Title';

import { Layout } from '@/components/Layout';
import styled from '@emotion/styled';

const H2 = styled.h2`
  font-family: Limelight, Garamond, serif;
  font-weight: 400;
`;

const Main = styled.main`
  font-family: Newsreader;
`;

const Home: React.FC<PageProps> = () => (
  <Layout>
    <Main>
      <H2>Is Thomas Constantine Moore actually dead?</H2>
      <p>
        Well, that depends. Reality is subjective! Would you like him to be?
      </p>
    </Main>
  </Layout>
);

export default Home;
