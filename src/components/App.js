import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import DayCard from '../containers/DayCard/DayCard';
import bg from '../assets/img/river-mountain.jpg';
import DayCards from '../containers/DayCards/DayCards';

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

const APP_ID = '69911451';
const APP_KEY = '4a2ac00be479232fe1d392bb09dae7f3';

const App = () => {
  const [zip, setZip] = useState('');
  const [showDayCard, setShowDayCard] = useState(false);
  const [submitZip, setSubmitZip] = useState('');
  const [forecastData, setForecastData] = useState('');
  const [currentDayData, setCurrentDayData] = useState({
    wx: 0,
    current: '...',
    feels: '...',
    hi: '...',
    low: '...',
    humidity: '...',
    windspd: '...'
  });

  const onInputChangedHandler = e => {
    setZip(e.target.value);
  };

  const onClickZipSubmit = () => {
    checkZip(zip);
  };

  const checkZip = z => {
    if (z.length === 5) {
      setSubmitZip(z);
      setShowDayCard(true);
      getData(z);
    }
  };

  const getData = z => {
    const forecast = `http://api.weatherunlocked.com/api/forecast/us.${z}?app_id=${APP_ID}&app_key=${APP_KEY}`;
    const current = `http://api.weatherunlocked.com/api/current/us.${z}?app_id=${APP_ID}&app_key=${APP_KEY}`;

    console.log('[getData]');
    const getCurrent = () => {
      return axios.get(current);
    };
    const getForecast = () => {
      return axios.get(forecast);
    };

    axios.all([getCurrent(), getForecast()]).then(
      axios.spread((cur, fore) => {
        const sunriseData = fore.data.Days[1].sunrise_time;
        const newSunrise = sunriseData.slice(1);
        const sunsetData = fore.data.Days[1].sunset_time;
        const sunsetFirst = sunsetData.slice(0, 2);
        const sunsetSecond = sunsetData.slice(2);
        const newSunset = sunsetFirst - 12 + sunsetSecond;
        console.log(fore.data);

        const currentDay = {
          wx: cur.data.wx_code,
          current: `${cur.data.temp_f.toFixed(0)}°`,
          feels: `${cur.data.feelslike_f.toFixed(0)}°`,
          hi: `${fore.data.Days[0].temp_max_f.toFixed(0)}°`,
          low: `${fore.data.Days[0].temp_min_f.toFixed(0)}°`,
          humidity: `${cur.data.humid_pct}%`,
          windspd: `${cur.data.windspd_mph}mph`
        };
        setCurrentDayData(currentDay);
      })
    );
  };

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
      <div style={{ display: 'flex' }}>
        <DayCard data={currentDayData} />
      </div>
    </Container>
  );
};

export default App;

// const APP_ID = '69911451';
// const APP_KEY = '4a2ac00be479232fe1d392bb09dae7f3';

// const APP_ID2 = 'af02d97e';
// const APP_KEY2 = '760c5bcc6e76230e4486b5946de351ab';
