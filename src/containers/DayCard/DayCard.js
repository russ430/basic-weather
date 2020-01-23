import React from 'react';
import styled from 'styled-components';
import Icon from './Icon/Icon';
import DataBox from './DataBox/DataBox';
import Time from './Time/Time';

const Card = styled.div`
  background-color: rgba(255, 255, 255, 0.95);
  width: 22rem;
  margin: 2rem 1rem;
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

const DayCard = props => {
  if (props.type === 'forecast') {
    return (
      <Card>
        <Day>{props.data.date}</Day>
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
      </Card>
    );
  }
  return (
    <Card>
      <Day>Today</Day>
      <Time />
      <Icon code={props.data.wx} />
      <DataBox
        border="none"
        label1="Current"
        data1={props.data.current}
        label2="Feels Like"
        data2={props.data.feels}
      />
      <DataBox border="top" label1="Hi" data1={props.data.hi} label2="Low" data2={props.data.low} />
      <DataBox
        border="top"
        label1="Humidity"
        data1={props.data.humidity}
        label2="Wind"
        data2={props.data.windspd}
      />
    </Card>
  );
};

export default DayCard;

// Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
// Photo by Kalen Emsley on Unsplash
