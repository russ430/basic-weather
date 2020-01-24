import React from 'react';
import DayCard from '../DayCard/DayCard';

const DayCards = props => {
  return (
    <>
      {props.data.map(day => {
        return <DayCard type="forecast" data={day} key={day.date} />;
      })}
    </>
  );
};

export default DayCards;
