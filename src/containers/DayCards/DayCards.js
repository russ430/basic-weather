import React from 'react';
import styled from 'styled-components';
import DayCard from '../DayCard/DayCard';

const DayCards = props => {
  const dayCards = [
    {
      date: 'Tomorrow',
      current: '56°',
      feels: '55°',
      hi: '60°',
      low: '50°',
      sunrise: '7:00 AM',
      sunset: '6:00 PM',
      wx: 0
    },
    {
      date: 'Tomorrow',
      current: '56°',
      feels: '55°',
      hi: '60°',
      low: '50°',
      sunrise: '7:00 AM',
      sunset: '6:00 PM',
      wx: 0
    },
    {
      date: 'Tomorrow',
      current: '56°',
      feels: '55°',
      hi: '60°',
      low: '50°',
      sunrise: '7:00 AM',
      sunset: '6:00 PM',
      wx: 0
    },
    {
      date: 'Tomorrow',
      current: '56°',
      feels: '55°',
      hi: '60°',
      low: '50°',
      sunrise: '7:00 AM',
      sunset: '6:00 PM',
      wx: 0
    }
  ];
  return (
    <div style={{ display: 'flex' }}>
      
      {dayCards.map((day, i) => {
        return (
          <DayCard
            data = {dayCards[i]}
            key = {i}
          />
        )
      })}
      </div>
    )
};

export default DayCards;
