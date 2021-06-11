import React from 'react';
import { Link, PageProps } from 'gatsby';

import Title from '@/components/Title';

import { Layout } from '@/components/Layout';
import { Headstone } from '@/components/Headstone';
import styled from '@emotion/styled';

const inscriptions = [
  `ya missed him`,
  `He died as he lived, dabbing`,
  `In retrospect, it WAS a bad idea`,
];

const Main = styled.main`
  font-family: Newsreader;
`;

const Home: React.FC<PageProps> = () => {
  const yod = new Date().getFullYear() + Math.floor(Math.random() * 1000);
  const optionCount = inscriptions.length;
  const randomInscription =
    inscriptions[Math.floor(Math.random() * optionCount)];

  return (
    <Layout>
      <Main>
        <Title />
        <Headstone yod={yod} inscription={randomInscription} />
        <p>
          <Link to="/about">What&apos;s happening</Link> • Follow me on Twitter
          (<a href="https://twitter.com/thomascmost">@thomascmost</a>)
        </p>
      </Main>
    </Layout>
  );
};

export default Home;
