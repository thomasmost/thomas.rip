import React from 'react';
import { Global, css } from '@emotion/react';
import styled from '@emotion/styled';

const Wrapper = styled(`div`)`
  padding: 20px 40px;
`;
export const Layout: React.FC = ({ children }) => (
  <Wrapper>
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
    {children}
  </Wrapper>
);
