import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 11rem 0;
`;

const Spinner = styled.div`
  display: inline-block;
  width: 80px;
  height: 80px;

  &:after {
    content: " ";
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #4a6391;
    border-color: #4a6391 transparent #4a6391 transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }

  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
`;

const spinner = () => (
  <Container>
    <Spinner />
  </Container>
);

export default spinner;
