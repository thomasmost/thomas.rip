import React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';

const Nav = styled.nav`
  font-family: Newsreader;
`;

export const Footer: React.FC = () => (
  <Nav>
    <Link to="/">Home</Link> •{` `}
    <Link to="/about">What&apos;s happening</Link> •{` `}
    Follow me on Twitter{` `}
    <a href="https://twitter.com/thomascmost">@thomascmost</a>
  </Nav>
);
