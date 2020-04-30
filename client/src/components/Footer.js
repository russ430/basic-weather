import React from 'react';
import styled from 'styled-components';

import { ReactComponent as Github } from '../assets/svgs/github.svg';

export default function Footer() {
  return (
    <Container>
      <a
        href="https://github.com/russ430/basic-weather"
        rel="noreferrer noopener"
        target="_blank"
      >
        <Icon />
      </a>
      <div>
        Icons made by{' '}
        <a
          href="https://www.flaticon.com/authors/pixel-perfect"
          target="_blank"
          rel="noreferrer noopener"
          title="Pixel perfect"
        >
          Pixel perfect
        </a>{' '}
        from{' '}
        <a
          href="https://www.flaticon.com/"
          target="_blank"
          rel="noreferrer noopener"
          title="Flaticon"
        >
          www.flaticon.com
        </a>
      </div>
      <div>
        Icons made by{' '}
        <a
          href="https://www.flaticon.com/authors/freepik"
          target="_blank"
          rel="noreferrer noopener"
          title="Freepik"
        >
          Freepik
        </a>{' '}
        from{' '}
        <a
          href="https://www.flaticon.com/"
          target="_blank"
          rel="noreferrer noopener"
          title="Flaticon"
        >
          www.flaticon.com
        </a>
      </div>
    </Container>
  );
}

const Icon = styled(Github)`
  height: 4rem;
  width: 4rem;
  fill: #fff;
`;

const Container = styled.footer`
  color: #fff;
  text-align: center;
  padding: 0.5rem;

  a {
    color: #fff;
  }
`;
