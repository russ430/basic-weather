import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  padding: 0.5rem 2rem;
  font-size: 2rem;
  background-color: rgba(255, 255, 255, 0.7);
  border: none;
  border-radius: 0.3rem;
  margin-top: 0.5rem;
`;

const input = props => (
  <Input
    onChange={props.changed}
    maxLength={props.maxLength}
    type={props.type}
    placeholder={props.placeholder}
  />
);

export default input;
