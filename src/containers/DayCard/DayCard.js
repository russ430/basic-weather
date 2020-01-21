import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Sunny from '../../assets/svgs/sunny.svg';

const Card = styled.div`
  background-color: #fff;
  margin: 2rem 0;
  padding: 1rem 2rem;
  border-radius: 0.3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Day = styled.h3`
  font-size: 2.5rem;
  margin: 0.5rem 0 0 0;
`;

const Time = styled.h4`
  font-size: 2rem;
`;

const Current = styled.h4`
  font-size: 2rem;
  margin: 0.5rem 0;
`;

const Highs = styled.h4`
  font-size: 1.8rem;
  margin: 0.5rem 0;

  & span {
    color: darkgrey;
  }
`;

const Icon = styled(Sunny)`
  width: 10rem;
  margin: 0.5rem 0;
`;

const KEY = '3726536d343884f1faa1c0836f6e3688';

const DayCard = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTemp, setCurrentTemp] = useState(null);

  const convertKelvin = temp => {
    const farenheight = (9 / 5) * (temp - 273) + 32;
    return farenheight.toFixed(0);
  };

  const getData = () => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?zip=02453,us&appid=${KEY}`)
      .then(response => {
        setData(response.data);
        setIsLoading(false);
        const current = convertKelvin(response.data.main.temp);
        setCurrentTemp(current);
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    getData();
  }, []);

  if (isLoading) {
    return null;
  }
  console.log(data);

  return (
    <Card>
      <Day>Today</Day>
      <Time>1:30PM</Time>
      <Icon />
      <Current>{currentTemp}°</Current>
      <Highs>
        34°/<span>18°</span>
      </Highs>
    </Card>
  );
};

export default DayCard;

// Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
