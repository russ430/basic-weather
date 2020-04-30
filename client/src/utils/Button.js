import React from 'react';
import styled from 'styled-components';

export default function button({ children, clicked }) {
  return (
    <Button onClick={clicked} type="button">
      {children}
    </Button>
  );
}

const Button = styled.button`
  padding: 1rem 1.5rem;
  background-color: #fff;
  border: none;
  cursor: pointer;
  color: black;
  border-radius: 0.3rem;
  margin: 1rem auto;
`;
