import React from 'react';
import { Link, PageProps } from 'gatsby';
import { Layout } from '@/components/Layout';
import styled from '@emotion/styled';

const H2 = styled.h2`
  font-family: AcademyEngravedLetPlain, Academy Engraved LET, Garamond, serif;
  font-weight: 400;
`;

const P = styled.p`
  margin-bottom: 30px;
  line-height: 1.5em;
`;

const Main = styled.main`
  font-family: Newsreader;
`;

const Home: React.FC<PageProps> = () => (
  <Layout>
    <Main>
      <H2>Wait but... why?</H2>
      <P>
        Listen, I&apos;m not getting any younger! We all have to get our affairs
        in order at some point. And frankly, thomas.rip was available on
        Namecheap dot com and at such an attractive pricepoint I just
        couldn&apos;t pass it up!
      </P>
      <H2>Seriously, though.</H2>
      <P>
        People keep telling me I need to build my brand. Maybe my brand is
        &apos;being dead.&apos;
      </P>
      <H2>Are you okay?</H2>
      <P>
        I&apos;m claiming my SEO digital tombstone in a rapidly deteriorating
        scarcity society. I&apos;ve never been better!
      </P>
      <H2>So is Thomas Constantine Moore actually dead?</H2>
      <P>
        Well, that depends. Reality is subjective!{` `}
        <Link to="/">Would you like him to be?</Link>
      </P>
    </Main>
  </Layout>
);

export default Home;
