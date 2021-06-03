import React from 'react';
import { Global, css } from '@emotion/react';
import styled from '@emotion/styled';

const Wrapper = styled(`div`)`
  padding: 40px;
`;
export const Layout: React.FC = ({ children }) => (
  <Wrapper>
    <Global
      styles={css`
        body {
          margin: 0;
          background: #110516;
        }
        div {
          color: white;
        }
      `}
    />
    {children}
  </Wrapper>
);
