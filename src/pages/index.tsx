import React from 'react';
import { PageProps } from 'gatsby';

import Title from '@/components/Title';

import { Layout } from '@/components/Layout';
import { Headstone } from '@/components/Headstone';

const inscriptions = [
  `ya missed him`,
  `He died as he lived, dabbing`,
  `In retrospect, it WAS a bad idea`,
];

const Home: React.FC<PageProps> = () => {
  const yod = new Date().getFullYear() + Math.floor(Math.random() * 1000);
  const optionCount = inscriptions.length;
  const randomInscription =
    inscriptions[Math.floor(Math.random() * optionCount)];

  return (
    <Layout>
      <main>
        <Title />
        <p>Thomas Constantine Moore is dead.</p>
        <Headstone yod={yod} inscription={randomInscription} />
        <p>
          Follow me on Twitter (
          <a href="https://twitter.com/thomascmost">@thomascmost</a>)
        </p>
      </main>
    </Layout>
  );
};

export default Home;
