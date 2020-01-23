import React from 'react';
import DayCard from '../DayCard/DayCard';

const DayCards = props => {
  return (
    <div style={{ display: 'flex' }}>
      {props.data.map(day => {
        return <DayCard type="forecast" data={day} key={day.date} />;
      })}
    </div>
  );
};

export default DayCards;
