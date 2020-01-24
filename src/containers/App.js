import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import DayCard from '../components/DayCard/DayCard';
import bg from '../assets/img/river-mountain.jpg';
import DayCards from '../components/DayCards/DayCards';
import Invalid from '../utils/Invalid/Invalid';
import Button from '../utils/Button/Button';
import Input from '../utils/Input/Input';

const Container = styled.div`
  height: 100vh;
  background-image: url(${bg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
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


const App = () => {
  const [zip, setZip] = useState('');
  const [showToday, setShowToday] = useState(false);
  const [showForecast, setShowForecast] = useState(false);
  const [forecastData, setForecastData] = useState(null);
  const [currentDayData, setCurrentDayData] = useState(null);
  const [invalidZip, setInvalidZip] = useState(false);

  const onInputChangedHandler = e => {
    setZip(e.target.value);
  };

  const onClickZipSubmit = () => {
    checkZip(zip);
  };

  const checkZip = z => {
    if (z.length === 5) {
      setInvalidZip(false);
      setCurrentDayData(null);
      setShowForecast(false);
      getData(z);
    } else {
      // eslint-disable-next-line no-undef
      setInvalidZip(true);
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

    axios
      .all([getCurrent(), getForecast()])
      .then(
        axios.spread((cur, fore) => {
          const today = new Date();
          const todaysDate = today.getDate();
          const forecastDataArray = [];
          // refactoring forecast Data from API to proper format
          fore.data.Days.map(obj => {
            // checking if first array in data API is for today or yesterday (via today's date vs. array's date)
            const objDate = +obj.date.slice(0, 2);
            if (objDate > todaysDate) {
              const { date, sunrise_time: sunrise, sunset_time: sunset } = obj;
              const sunsetFirst = sunset.slice(0, 2);
              const sunsetSecond = sunset.slice(2);
              const newSunset = `${sunsetFirst - 12 + sunsetSecond} PM`;
              const newSunrise = `${sunrise.slice(1)} AM`;
              const newHi = `${obj.temp_max_f.toFixed(0)}°`;
              const newLow = `${obj.temp_min_f.toFixed(0)}°`;
              const newPrecip = `${obj.prob_precip_pct}%`;
              const newWind = `${obj.windspd_max_mph}mph`;
              let wx = obj.Timeframes[4].wx_code;
              if (obj.prob_precip_pct > 60) {
                wx = 10;
              }
              const newObj = {
                date,
                hi: newHi,
                low: newLow,
                sunrise: newSunrise,
                sunset: newSunset,
                precip: newPrecip,
                wind: newWind,
                wx
              };
              forecastDataArray.push(newObj);
            }
          });

          setForecastData(forecastDataArray);

          let currentHi = `${fore.data.Days[0].temp_max_f.toFixed(0)}°`;
          let currentLow = `${fore.data.Days[0].temp_min_f.toFixed(0)}°`;
          if (fore.data.Days[0].Timeframes.length < 8) {
            currentHi = `${fore.data.Days[1].temp_max_f.toFixed(0)}°`;
            currentLow = `${fore.data.Days[1].temp_min_f.toFixed(0)}°`;
          }

          const currentDay = {
            wx: cur.data.wx_code,
            current: `${cur.data.temp_f.toFixed(0)}°`,
            feels: `${cur.data.feelslike_f.toFixed(0)}°`,
            hi: currentHi,
            low: currentLow,
            humidity: `${cur.data.humid_pct}%`,
            windspd: `${cur.data.windspd_mph.toFixed(0)}mph`
          };
          setCurrentDayData(currentDay);
        })
      )
      .then(setShowToday(true))
      .catch(error => {
        console.log(error);
        setShowToday(false);
        // eslint-disable-next-line no-undef
        alert('You have entered a non-existent US Zip Code');
      });
  };

  const showForecastHandler = () => {
    setShowForecast(!showForecast);
  };

  return (
    <Container>
      <Title>What's the Weather like?</Title>
      <Subtitle>(enter US zip code only, please)</Subtitle>
      {invalidZip ? <Invalid /> : null}
      <Input
        type="text"
        maxLength="5"
        placeholder="Show me the weather in..."
        changed={e => onInputChangedHandler(e)}
      />
      <Button type="button" clicked={onClickZipSubmit}>
        Let's see it!
      </Button>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        {showToday ? <DayCard data={currentDayData} /> : null}
        {showForecast ? <DayCards data={forecastData} /> : null}
      </div>
      {forecastData !== null ? <Button clicked={showForecastHandler}>See Forecast</Button> : null}
    </Container>
  );
};

export default App;

// const APP_ID = '69911451';
// const APP_KEY = '4a2ac00be479232fe1d392bb09dae7f3';

// const APP_ID2 = 'af02d97e';
// const APP_KEY2 = '760c5bcc6e76230e4486b5946de351ab';
