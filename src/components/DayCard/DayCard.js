import React from 'react';
import styled from 'styled-components';
import Icon from './Icon/Icon';
import DataBox from './DataBox/DataBox';
import Time from './Time/Time';
import Spinner from '../../utils/Spinner/Spinner';

const Card = styled.div`
  background-color: rgba(255, 255, 255, 0.95);
  width: 16rem;
  margin: 2rem 1rem;
  padding: 0.5rem 1rem;
  border-radius: 0.3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Day = styled.h3`
  font-size: 2rem;
  margin: 0.5rem 0;
`;

const Today = styled.h3`
  font-size: 1.5rem;
  font-weight: 400;
`;

const DayCard = props => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  if (props.type === 'forecast') {
    const { date } = props.data;
    const dateDay = date.slice(0, 3);
    const dateMonth = date.slice(3, 6);
    const dateYear = date.slice(6, 8);
    const newDate = `${dateMonth}${dateDay}${dateYear}`;
    const day = new Date(newDate);
    const weekDay = day.getDay();

    let loading = null;
    if (props.data === null) {
      loading = <Spinner />;
    } else {
      loading = (
        <>
          <Icon code={props.data.wx} />
          <DataBox
            border="none"
            label1="Low"
            data1={props.data.low}
            label2="Hi"
            data2={props.data.hi}
          />
          <DataBox
            border="top"
            label1="Precipitation"
            data1={props.data.precip}
            label2="Wind"
            data2={props.data.wind}
          />
          <DataBox
            border="top"
            label1="Sunrise"
            data1={props.data.sunrise}
            label2="Sunset"
            data2={props.data.sunset}
          />
        </>
      );
    }

    return (
      <Card>
        <Day>{daysOfWeek[weekDay]}</Day>
        <Today>{newDate}</Today>
        {loading}
      </Card>
    );
  }

  let loaded = null;
  if (props.data === null) {
    loaded = <Spinner />;
  } else {
    loaded = (
      <>
        <Icon code={props.data.wx} />
        <DataBox
          border="none"
          label1="Current"
          data1={props.data.current}
          label2="Feels Like"
          data2={props.data.feels}
        />
        <DataBox
          border="top"
          label1="Low"
          data1={props.data.low}
          label2="Hi"
          data2={props.data.hi}
        />
        <DataBox
          border="top"
          label1="Humidity"
          data1={props.data.humidity}
          label2="Wind"
          data2={props.data.windspd}
        />
      </>
    );
  }
  return (
    <Card>
      <Day>Today</Day>
      <Time />
      {loaded}
    </Card>
  );
};

export default DayCard;

// Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
// Photo by Kalen Emsley on Unsplash
