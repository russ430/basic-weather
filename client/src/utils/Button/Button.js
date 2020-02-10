import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  padding: 1rem 1.5rem;
  background-color: #fff;
  border: none;
  cursor: pointer;
  color: black;
  border-radius: 0.3rem;
  margin: 0.5rem auto;
  align-self: flex-start;
`;

const button = props => (
  <Button onClick={props.clicked} type="button">
    {props.children}
  </Button>
);

export default button;
