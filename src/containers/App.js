import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import DayCard from '../components/DayCard/DayCard';
import bg from '../assets/img/river-mountain.jpg';
import DayCards from '../components/DayCards/DayCards';
import Invalid from '../utils/Invalid/Invalid';

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
  const [isLoading, setIsLoading] = useState(true);
  const [showToday, setShowToday] = useState(false);
  const [showForecast, setShowForecast] = useState(false);
  const [forecastData, setForecastData] = useState([]);
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
              const wx = obj.Timeframes[4].wx_code;
              const sunsetFirst = sunset.slice(0, 2);
              const sunsetSecond = sunset.slice(2);
              const newSunset = `${sunsetFirst - 12 + sunsetSecond} PM`;
              const newSunrise = `${sunrise.slice(1)} AM`;
              const newHi = `${obj.temp_max_f.toFixed(0)}°`;
              const newLow = `${obj.temp_min_f.toFixed(0)}°`;
              const newPrecip = `${obj.prob_precip_pct}%`;
              const newWind = `${obj.windspd_max_mph}mph`;
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
      .then(setShowToday(true), setIsLoading(false));
  };

  const showForecastHandler = () => {
    setShowForecast(!showForecast);
  };

  let today = null;
  if (showToday) {
    today = <DayCard loading={isLoading} data={currentDayData} />;
  }

  let forecast = null;
  if (showForecast) {
    forecast = <DayCards loading={isLoading} data={forecastData} />;
  }

  let invalid = null;
  if (invalidZip) {
    invalid = <Invalid />;
  }

  return (
    <Container>
      <Title>What's the Weather like?</Title>
      <Subtitle>(enter US zip code only, please)</Subtitle>
      {invalid}
      <Input
        maxLength="5"
        placeholder="Show me the weather in..."
        onChange={e => onInputChangedHandler(e)}
      />
      <Button type="button" onClick={onClickZipSubmit}>
        Let's see it!
      </Button>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {today}
        {forecast}
      </div>
      <button type="button" onClick={showForecastHandler}>
        See Forecast
      </button>
    </Container>
  );
};

export default App;

// const APP_ID = '69911451';
// const APP_KEY = '4a2ac00be479232fe1d392bb09dae7f3';

// const APP_ID2 = 'af02d97e';
// const APP_KEY2 = '760c5bcc6e76230e4486b5946de351ab';
