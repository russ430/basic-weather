import React from 'react';
import styled from 'styled-components';

const Invalid = styled.p`
  font-size: 1.5rem;
  font-weight: 500;
  color: darkred;
`;

const invalid = props => <Invalid>{props.children}</Invalid>;

export default invalid;
