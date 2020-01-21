import React from 'react';
import styled from 'styled-components';
import DayCard from '../containers/DayCard/DayCard';

const Container = styled.div`
  height: 100vh;
  background-color: lightgreen;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin: 1rem 0;
`;

const Subtitle = styled.h2`
  font-size: 2.5rem;
  margin: 1rem 0;
  font-weight: 400;
`;

const Input = styled.input`
  margin: 1rem 0;
  padding: 1rem 2rem;
  border: 1px solid #eee;
  font-size: 2rem;
`;

const Button = styled.button`
  font-size: 1.5rem;
  background-color: #fff;
  border: none;
  padding: 1rem 2rem;
  border-radius: 0.3rem;
  border: 1px solid #bbb;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-0.3rem);
  }
`;

const App = () => {
  return (
    <Container>
      <Title>What's the Weather like?</Title>
      <Subtitle>Type in your Zip Code below</Subtitle>
      <Input />
      <Button type="button">Enter</Button>
      <DayCard />
    </Container>
  );
};

export default App;
