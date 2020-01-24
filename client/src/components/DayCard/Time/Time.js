import React from 'react';
import styled from 'styled-components';

const Time = styled.h4`
  font-size: 1.5rem;
  font-weight: 400;
`;

const time = () => {
  const timeNow = new Date();
  const hours = timeNow.getHours();
  const minutes = timeNow.getMinutes();
  const newTime = () => {
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

  return <Time>{newTime()}</Time>;
};

export default time;
