import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { isBefore, startOfToday } from 'date-fns';

import DayCard from './components/DayCard';
import Footer from './components/Footer';
import Week from './components/Week';
import Button from './utils/Button';
import Errors from './utils/Errors/Errors';
import Input from './utils/Input';
import Spinner from './utils/Spinner';

import { modifyDate } from './helpers/helpers';

export default function App() {
  const [zip, setZip] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForecast, setShowForecast] = useState(false);
  const [forecast, setForecast] = useState([]);
  const [zipNotNums, setZipNotNums] = useState(false);
  const [error, setError] = useState(null);

  const onInputChangedHandler = e => {
    // checking if the input is a number
    setError(null);
    const isNum = /^\d*$/;
    if (isNum.test(e.target.value)) {
      setZipNotNums(false);
      setZip(e.target.value);
    } else {
      setZipNotNums(true);
    }
  };

  const onFormSubmit = e => {
    e.preventDefault();
    checkZip(zip);
  };

  const onClickZipSubmit = () => {
    checkZip(zip);
  };

  const checkZip = z => {
    if (z.length === 5) {
      setZipNotNums(false);
      setShowForecast(false);
      getData(z);
    } else {
      setZipNotNums(true);
    }
  };

  const parseData = data => {
    if (data.Description) {
      setError(data.Description);
      setLoading(false);
      return;
    }
    const { Days } = data;
    const forecast = [];

    Days.forEach(day => {
      const { date } = day;
      const modifiedDate = modifyDate(date);
      if (!isBefore(new Date(modifiedDate), startOfToday())) {
        const humidity = parseFloat(
          ((day.humid_min_pct + day.humid_max_pct) / 2).toFixed(0)
        );
        const data = {
          date: modifiedDate,
          highTemp: day.temp_max_f.toFixed(0),
          lowTemp: day.temp_min_f.toFixed(0),
          precipPct: day.prob_precip_pct,
          humidity,
          sunrise: day.sunrise_time,
          sunset: day.sunset_time,
        };
        forecast.push(data);
      }
    });
    setForecast(forecast);
    setLoading(false);
  };

  const getData = zipcode => {
    setLoading(true);
    setForecast([]);

    axios
      .get(`/weather/fore/${zipcode}`)
      .then(response => {
        parseData(response.data);
      })
      .catch(error => console.log(error));
  };

  const showForecastHandler = () => {
    setShowForecast(!showForecast);
  };

  return (
    <Container>
      <Title>What's the Weather like?</Title>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        onSubmit={onFormSubmit}
      >
        <Errors zipNotNums={zipNotNums} />
        <Subtitle htmlFor="zip code">(enter US zip code only, please)</Subtitle>
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
      <Errors error={error} />
      {forecast.length > 0 && (
        <Button clicked={showForecastHandler}>7 Day Forecast</Button>
      )}
      <Cards>
        {loading && <Spinner />}
        {forecast.length > 0 && <DayCard data={forecast[0]} />}
        {showForecast && <Week data={forecast.slice(1)} />}
      </Cards>
      <Footer />
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  background-color: #0288d1;
  overflow: auto;
  position: relative;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin: 2rem 0;
  color: #fff;
  text-align: center;
`;

const Subtitle = styled.label`
  font-size: 2rem;
  color: #fff;
  font-weight: 400;
  font-style: italic;
  margin-bottom: 0.2rem;
`;

const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
