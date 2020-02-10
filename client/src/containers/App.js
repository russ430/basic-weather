import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import DayCard from '../components/DayCard/DayCard';
import bg from '../assets/img/river-mountain.jpg';
import DayCards from '../components/DayCards/DayCards';
import Invalid from '../utils/Invalid/Invalid';
import Button from '../utils/Button/Button';
import Input from '../utils/Input/Input';
import Footer from '../components/Footer/Footer';

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
  position: relative;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin: 2rem 0;
  color: #fff;
`;

const Subtitle = styled.label`
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
  const [zipError, setZipError] = useState(false);

  const onInputChangedHandler = e => {
    setZipError(false);
    //checking if the input is a number
    const isNum = /^\d*$/;
    if(isNum.test(e.target.value)) {
      setInvalidZip(false);
      setZip(e.target.value);
    } else {
      setInvalidZip(true);
    }
  };

  const onFormSubmit = e => {
    e.preventDefault();
    checkZip(zip);
  }

  const onClickZipSubmit = () => {
    checkZip(zip);
  };

  const checkZip = z => {
    // if zip includes numbers only it's length will be checked
    // if input !== numbers, zip state is never changed from '', therefore z.length < 5
    if (z.length === 5) {
      setInvalidZip(false);
      setCurrentDayData(null);
      setShowForecast(false);
      getData(z);
    } else {
      setInvalidZip(true);
    }
  };

  const getData = z => {
    const foreApi = () => {
      return axios.get(`/weather/fore/${z}`);
    };
    const curApi = () => {
      return axios.get(`/weather/cur/${z}`);
    };
    axios
      .all([foreApi(), curApi()])
      .then(
        axios.spread((fore, cur) => {
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
        setZipError(true);
        // eslint-disable-next-line no-undef
        // alert('You may have entered an invalid Zip Code. If not, something must be wrong on our end. Try again later!');
      });
  };

  const showForecastHandler = () => {
    setShowForecast(!showForecast);
  };

  return (
    <Container>
      <Title>What's the Weather like?</Title>
      <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}onSubmit={onFormSubmit}>
        <Subtitle htmlFor="zip code" >(enter US zip code only, please)</Subtitle>
        <Input
          name="zip code"
          aria-label="Zip Code"
          type="text"
          maxLength="5"
          placeholder="Show me the weather in..."
          changed={e => onInputChangedHandler(e)}
          />
        <Button type="submit" clicked={onClickZipSubmit}>
          Let's see it!
        </Button>
      </form>
        {zipError && <Invalid>You may have entered an invalid US Zip Code or our servers are temporarily down</Invalid>}
        {invalidZip && <Invalid>Zip Codes must be at least 5 digits long and numbers only</Invalid>}
      {/* only render forecast button when zip code is entered and data retrieved */}
      {forecastData !== null ? <Button clicked={showForecastHandler}>7 Day Forecast</Button> : null}
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        {/* only show day card when data is being retrieved */}
        {showToday && <DayCard data={currentDayData} />}
        {/* only show 7 day forecast cards when forecast button is clicked */}
        {showForecast && <DayCards data={forecastData} />}
      </div>
      <Footer />
    </Container>
  );
};

export default App;
