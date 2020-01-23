import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 1rem 0;
  border-top: ${props => (props.border === 'top' ? '1px solid #eee' : null)};
`;

const Box = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.h3`
  font-size: 1.3rem;
  font-weight: 400;
  font-style: italic;
`;

const Data = styled.p`
  font-size: 1.5rem;
`;

const DataBox = props => (
  <Container border={props.border}>
    <Box>
      <Data>{props.data1}</Data>
      <Label>{props.label1}</Label>
    </Box>
    <Box>
      <Data>{props.data2}</Data>
      <Label>{props.label2}</Label>
    </Box>
  </Container>
);

export default DataBox;
