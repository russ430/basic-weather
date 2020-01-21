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

const Icon = styled(Sunny)`
  width: 10rem;
  margin: 0.5rem 0;
`;

const KEY = '3726536d343884f1faa1c0836f6e3688';

const APP_ID = '69911451';
const APP_KEY = '4a2ac00be479232fe1d392bb09dae7f3';

const DayCard = props => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTemp, setCurrentTemp] = useState('0');
  const [feelsLike, setFeelsLike] = useState('0');

  const convertKelvin = temp => {
    const farenheight = (9 / 5) * (temp - 273) + 32;
    return farenheight.toFixed(0);
  };

  const getData = () => {
    // axios
    //   .get(`https://api.openweathermap.org/data/2.5/weather?zip=${props.zip},us&appid=${KEY}`)
    //   .then(response1 => {
    //     setData(response1.data);
    //     const current = convertKelvin(response1.data.main.temp);
    //     setCurrentTemp(current);
    //     setIsLoading(false);
    //   })
    //   .catch(error => console.log(error));
    axios
      .get(
        `http://api.weatherunlocked.com/api/current/us.${props.zip}?app_id=${APP_ID}&app_key=${APP_KEY}`
      )
      .then(response => {
        console.log(response);
        setCurrentTemp(response.data.temp_f.toFixed(0));
        setFeelsLike(response.data.feelslike_f.toFixed(0));
      });
  };

  useEffect(() => {
    getData();
    console.log('[useEffect]');
  }, []);

  return (
    <Card>
      <Day>Today</Day>
      <Time>1:30PM</Time>
      <Icon />
      <Current>{currentTemp}°</Current>
      <Current>Feels like: {feelsLike}°</Current>
    </Card>
  );
};

export default DayCard;

// Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
