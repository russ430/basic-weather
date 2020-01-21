import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Sunny from '../../assets/svgs/sunny.svg';

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
  margin: 0.5rem 0 0 0;
`;

const Time = styled.h4`
  font-size: 2rem;
`;

const Current = styled.h4`
  font-size: 2rem;
  margin: 0.5rem 0;
`;

const Highs = styled.h4`
  font-size: 1.8rem;
  margin: 0.5rem 0;

  & span {
    color: darkgrey;
  }
`;

const Icon = styled(Sunny)`
  width: 10rem;
  margin: 0.5rem 0;
`;

const DayCard = () => {
  return (
    <Card>
      <Day>Monday</Day>
      <Time>1:30PM</Time>
      <Icon />
      <Current>22°</Current>
      <Highs>
        34°/<span>18°</span>
      </Highs>
    </Card>
  );
};

export default DayCard;

// Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
