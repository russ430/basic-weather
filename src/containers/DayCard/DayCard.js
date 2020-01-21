import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background-color: #fff;
  margin: 2rem 0;
  padding: 1rem 2rem;
  border-radius: 0.3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Day = styled.h3`
  font-size: 2.5rem;
`;

const Time = styled.h4`
  font-size: 2rem;
`;

const Current = styled.h4`
  font-size: 2rem;
`;

const Highs = styled.h4`
  font-size: 1.8rem;

  & span {
    color: darkgrey;
  }
`;

const DayCard = () => {
  return (
    <Card>
      <Day>Monday</Day>
      <Time>1:30PM</Time>
      <p>image</p>
      <Current>current temp</Current>
      <Highs>
        hi/<span>low</span>
      </Highs>
    </Card>
  );
};

export default DayCard;
