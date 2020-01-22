import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Icon from './Icon/Icon';
import DataBox from './DataBox/DataBox';

const Card = styled.div`
  background-color: rgba(255, 255, 255, 0.95);
  width: 22rem;
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
  font-weight: 400;
`;

const APP_ID = '69911451';
const APP_KEY = '4a2ac00be479232fe1d392bb09dae7f3';

const DayCard = () => {
  const [coords, setCoords] = useState({ lat: '42.361', long: '-71.057' });
  const [currentTemp, setCurrentTemp] = useState('55');
  const [feelsLike, setFeelsLike] = useState('56');
  const [highTemp, setHighTemp] = useState('65');
  const [lowTemp, setLowTemp] = useState('34');
  const [sunrise, setSunrise] = useState('7:05 AM');
  const [sunset, setSunset] = useState('5:55 PM');
  const [wxCode, setWxCode] = useState(0);

  const timeNow = new Date();
  const hours = timeNow.getHours();
  const minutes = timeNow.getMinutes();
  const time = () => {
    let newMin = minutes;
    if (minutes < 10) {
      newMin = `0${minutes}`;
    }
    if (hours === 12) {
      return `${hours}:${newMin} PM`;
    }
    if (hours > 12) {
      const newHour = hours - 12;
      return `${newHour}:${newMin} PM`;
    }
    return `${hours}:${newMin} AM`;
  };

  const getData = () => {
    console.log('[getData]');
    // axios
    //   .get(
    //     `http://api.weatherunlocked.com/api/current/${coords.lat},${coords.long}?app_id=${APP_ID}&app_key=${APP_KEY}`
    //   )
    //   .then(response => {
    //     setCurrentTemp(`${response.data.temp_f.toFixed(0)}°`);
    //     setFeelsLike(`${response.data.feelslike_f.toFixed(0)}°`);
    //     setWxCode(response.data.wx_code);
    //   });
    // axios
    //   .get(
    //     `http://api.weatherunlocked.com/api/forecast/${coords.lat},${coords.long}?app_id=${APP_ID}&app_key=${APP_KEY}`
    //   )
    //   .then(response => {
    //     const sunriseData = response.data.Days[1].sunrise_time;
    //     const newSunrise = sunriseData.slice(1);
    //     setSunrise(`${newSunrise}AM`);
    //     const sunsetData = response.data.Days[1].sunset_time;
    //     const sunsetFirst = sunsetData.slice(0, 2);
    //     const sunsetSecond = sunsetData.slice(2);
    //     const newSunset = sunsetFirst - 12 + sunsetSecond;
    //     setSunset(`${newSunset}PM`);
    //     setHighTemp(`${response.data.Days[1].temp_max_f.toFixed(0)}°`);
    //     setLowTemp(`${response.data.Days[1].temp_min_f.toFixed(0)}°`);
    //   });
  };

  const showPosition = position => {
    const newLat = position.coords.latitude.toFixed(2);
    const newLong = position.coords.longitude.toFixed(2);
    setCoords({ lat: newLat, long: newLong });
  };

  const noPosition = () => {
    // eslint-disable-next-line no-alert
    alert('Please enable location services in order to receive weather data for your location');
  };

  useEffect(() => {
    // eslint-disable-next-line no-undef
    if (navigator.geolocation) {
      // eslint-disable-next-line no-undef
      navigator.geolocation.getCurrentPosition(showPosition, noPosition);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [coords]);

  return (
    <Card>
      <Day>Today</Day>
      <Time>{time()}</Time>
      <Icon code={wxCode} />
      <DataBox label1="Current" data1={currentTemp} label2="Feels Like" data2={feelsLike} />
      <DataBox border="top" label1="Hi" data1={highTemp} label2="Low" data2={lowTemp} />
      <DataBox border="top" label1="Sunrise" data1={sunrise} data2={sunset} label2="Sunset" />
    </Card>
  );
};

export default DayCard;

// Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
// Photo by Kalen Emsley on Unsplash
