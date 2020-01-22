import React from 'react';
import styled from 'styled-components';
import Sunny from '../../../assets/svgs/sunny.svg';
import Rainy from '../../../assets/svgs/rain.svg';
import Snow from '../../../assets/svgs/snow.svg';
import Partly from '../../../assets/svgs/partly-cl.svg';
import Thunder from '../../../assets/svgs/thunder.svg';

const icon = props => {
  const svgCode = props.code;

  let iconSVG = Snow;
  if (svgCode === 0) {
    iconSVG = Sunny;
  } else if ((svgCode >= 1 && svgCode <= 3) || (svgCode >= 45 && svgCode <= 49)) {
    iconSVG = Partly;
  } else if (
    (svgCode >= 10 && svgCode <= 21) ||
    (svgCode >= 23 && svgCode <= 29) ||
    (svgCode >= 50 && svgCode <= 68) ||
    (svgCode >= 80 && svgCode <= 84)
  ) {
    iconSVG = Rainy;
  } else if (svgCode === 29 || svgCode === 91 || svgCode === 92) {
    iconSVG = Thunder;
  } else {
    iconSVG = Snow;
  }

  const Icon = styled(iconSVG)`
    width: 10rem;
    margin: 0.5rem 0;
  `;

  return <Icon />;
};

export default icon;
