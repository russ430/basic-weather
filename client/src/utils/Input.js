import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

const ZipInput = styled.input`
  padding: 0.5rem 2rem;
  font-size: 2rem;
  background-color: rgba(255, 255, 255, 0.7);
  border: none;
  border-radius: 0.3rem;
  margin-top: 0.5rem;
`;

export default function Input({
  changed,
  maxLength,
  placeholder,
  type,
  value,
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <ZipInput
      onChange={changed}
      maxLength={maxLength}
      type={type}
      placeholder={placeholder}
      ref={inputRef}
      value={value}
    />
  );
}
