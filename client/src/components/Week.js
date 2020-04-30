import React from 'react';
import DayCard from './DayCard';

export default function Week({ data }) {
  return (
    <>
      {data.map(day => (
        <DayCard data={day} key={day.date} />
      ))}
    </>
  );
}
