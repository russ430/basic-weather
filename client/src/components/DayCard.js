import React from 'react';
import styled from 'styled-components';
import { format, isToday } from 'date-fns';
import moment from 'moment';

import Icon from '../utils/Icon';

export default function DayCard({ data }) {
  const { date, highTemp, humidity, lowTemp, precipPct } = data;

  const sunrise = new Date(`${date} ${data.sunrise}`);
  const sunset = new Date(`${date} ${data.sunset}`);
  const day = isToday(new Date(date))
    ? 'Today'
    : format(new Date(date), 'cccc');

  return (
    <Card>
      <Today>{day}</Today>
      <CurrentDate>{format(new Date(date), 'MMMM do')}</CurrentDate>
      <Main>
        <div>
          <Icon precipPct={precipPct} size="10rem" />
        </div>
        <Temps>
          <High>{highTemp}°</High>
          <Low>{lowTemp}°</Low>
        </Temps>
      </Main>
      <Secondary>
        <Box>
          <DataBox>
            <Data>{precipPct}%</Data>
            <Label>Precip</Label>
          </DataBox>
          <DataBox>
            <Data>{humidity}%</Data>
            <Label>Humidity</Label>
          </DataBox>
        </Box>
        <Box>
          <DataBox>
            <Data>{moment(sunrise).format('h:mm')}</Data>
            <Label>Sunrise</Label>
          </DataBox>
          <DataBox>
            <Data>{moment(sunset).format('h:mm')}</Data>
            <Label>Sunset</Label>
          </DataBox>
        </Box>
      </Secondary>
    </Card>
  );
}

const Card = styled.div`
  background-color: rgba(255, 255, 255, 0.95);
  margin: 2rem 1rem;
  padding: 0.5rem 1.5rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Today = styled.h3`
  font-size: 3rem;
  font-weight: 400;
`;

const CurrentDate = styled(Today)`
  font-size: 2rem;
`;

const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0.5rem 0;
`;

const Temps = styled.div`
  flex: 1;
  margin-left: 2rem;
`;

const High = styled.h2`
  font-weight: 300;
  margin: 0.25rem auto;
  font-size: 3.5rem;
`;

const Low = styled(High)`
  color: grey;
  font-style: italic;
`;

const Secondary = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;

  border-top: 1px solid #ddd;
`;

const Box = styled.div`
  width: 50%;
  text-align: center;
  margin-top: 0.5rem;

  &:not(:last-child) {
    border-right: 1px solid #eee;
  }
`;

const DataBox = styled.div`
  margin: 0.5rem 0;
  padding: 0.5rem 1rem;
`;

const Data = styled.h2`
  font-size: 2.3rem;
  font-weight: 400;
`;

const Label = styled(Data)`
  font-style: italic;
  font-size: 1.5rem;
`;

// Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
// Photo by Kalen Emsley on Unsplash
