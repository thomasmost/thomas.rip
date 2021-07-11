import React from 'react';
import { Global, css } from '@emotion/react';
import styled from '@emotion/styled';
import { Helmet } from 'react-helmet';
import { Footer } from './Footer';

const Wrapper = styled(`div`)`
  padding: 0 40px;
  position: relative;
  min-height: 100vh;
`;

const Main = styled.main`
  font-family: Newsreader;
  min-height: 640px;
  max-height: 90%;
  overflow: scroll;
  padding-bottom: 2.5rem;
`;

export const Layout: React.FC = ({ children }) => (
  <Wrapper>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Thomas Moore is Dead</title>
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@thomascmost" />
      <meta property="og:url" content="https://www.thomas.rip" />
      <meta property="og:title" content="Thomas Constantine Moore is dead." />
      <meta
        property="og:description"
        content={`(Disclaimer: Whether Thomas is actually dead is a sort of quantum unknowability, a sort of "Schrodinger's Cat" sitation, if you will. How to know if Thomas is actually dead? How do we know that anything is true at all? I'm afraid I can't help you!)`}
      />
      <meta property="og:image" content="https://www.thomas.rip/card.png" />

      <link rel="canonical" href="https://thomas.rip/" />
    </Helmet>
    <Global
      styles={css`
        body {
          margin: 0;
          background: #110516;
          a {
            color: red;
            text-decoration: none;
            transition: 0.5s;
            &:focus,
            &:hover {
              color: pink;
            }
          }
        }
        div {
          color: white;
        }
      `}
    />
    <Main>{children}</Main>
    <Footer />
  </Wrapper>
);
