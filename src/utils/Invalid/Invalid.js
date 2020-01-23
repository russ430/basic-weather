import React from 'react';
import styled from 'styled-components';

const Invalid = styled.p`
  font-size: 1.5rem;
  font-weight: 500;
  color: darkred;
`;

const invalid = () => <Invalid>Invalid Zip Code. Must be at least 5 digits long.</Invalid>;

export default invalid;
