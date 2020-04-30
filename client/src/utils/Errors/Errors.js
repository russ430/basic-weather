import React from 'react';

import Invalid from './Invalid';

export default function Errors({ zipNotNums, error }) {
  return (
    <>
      {zipNotNums && <Invalid>Zip Code must be 5 numerical digits</Invalid>}
      {error && <Invalid>{error}</Invalid>}
    </>
  );
}
