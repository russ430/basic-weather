import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Partly } from '../assets/svgs/partly-cl.svg';
import { ReactComponent as Rainy } from '../assets/svgs/rain.svg';

export default function icon({ precipPct, size }) {
  return (
    <>
      {precipPct > 65 ? <RainyIcon size={size} /> : <PartlyIcon size={size} />}
    </>
  );
}

const PartlyIcon = styled(Partly)`
  width: ${props => props.size};
  height: ${props => props.size};
  margin: 1.5rem 0;
`;

const RainyIcon = styled(Rainy)`
  width: ${props => props.size};
  height: ${props => props.size};
  margin: 1.5rem 0;
`;
