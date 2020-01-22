import React from 'react';
import styled from 'styled-components';
import DayCard from '../containers/DayCard/DayCard';
import bg from '../assets/img/river-mountain.jpg';

const Container = styled.div`
  height: 100vh;
  background-image: url(${bg});
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin: 1rem 0;
  color: #fff;
`;

const App = () => {
  return (
    <Container>
      <Title>What's the Weather like?</Title>
      <DayCard />
    </Container>
  );
};

export default App;
