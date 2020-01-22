import React, { useState } from 'react';
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
  margin: 2rem 0;
  color: #fff;
`;

const Subtitle = styled.h2`
  font-size: 2rem;
  color: #fff;
  font-weight: 400;
  font-style: italic;
  margin-bottom: 0.2rem;
`;

const Input = styled.input`
  padding: 0.5rem 2rem;
  font-size: 2rem;
  border: 1px solid #eee;
  background-color: rgba(255, 255, 255, 0.7);
`;

const Button = styled.button`
  padding: 1rem 1.5rem;
  background-color: #fff;
  border: none;
  cursor: pointer;
  color: black;
  border-radius: 0.3rem;
  margin: 0.5rem 0;
`;

const App = () => {
  const [zip, setZip] = useState('');
  const [showDayCard, setShowDayCard] = useState(false);
  const [submitZip, setSubmitZip] = useState('');

  const onInputChangedHandler = e => {
    setZip(e.target.value);
  };

  const onClickZipSubmit = () => {
    checkZip(zip);
  };

  const checkZip = z => {
    if (z.length === 5) {
      setSubmitZip(zip);
      setShowDayCard(true);
    }
  };

  let card = null;
  if (showDayCard) {
    card = <DayCard zip={submitZip} />;
  }

  return (
    <Container>
      <Title>What's the Weather like?</Title>
      <Subtitle>(enter US zip code only, please)</Subtitle>
      <Input
        maxLength="5"
        placeholder="Show me the weather in..."
        onChange={e => onInputChangedHandler(e)}
      />
      <Button type="button" onClick={onClickZipSubmit}>
        Let's see it!
      </Button>
      {card}
    </Container>
  );
};

export default App;
