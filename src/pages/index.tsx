import React from 'react';
import { Link, PageProps } from 'gatsby';

import Title from '@/components/Title';

import { Layout } from '@/components/Layout';
import { Headstone } from '@/components/Headstone';
import styled from '@emotion/styled';

const inscriptions = [
  `ya missed him`,
  `He died as he lived,
   dabbing`,
  `In retrospect,
  it WAS a bad idea`,
];

const HeadstoneWrapper = styled.div`
  margin: auto;
  max-width: 1200px;
`;

const Home: React.FC<PageProps> = () => {
  const yod = new Date().getFullYear() + Math.floor(Math.random() * 1000);
  const optionCount = inscriptions.length;
  const randomInscription =
    inscriptions[Math.floor(Math.random() * optionCount)];

  return (
    <Layout>
      <Title />
      <HeadstoneWrapper>
        <Headstone yod={yod} inscription={randomInscription} />
      </HeadstoneWrapper>
    </Layout>
  );
};

export default Home;
