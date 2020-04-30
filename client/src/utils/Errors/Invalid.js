import React from 'react';
import styled from 'styled-components';

export default function invalid(props) {
  return <Invalid>{props.children}</Invalid>;
}

const Invalid = styled.p`
  font-size: 1.5rem;
  font-weight: 500;
  color: darkred;
`;
