import React from 'react';
import styled from 'styled-components';
import Icon from '../../utils/Icon/Icon';

const Container = styled.footer`
  color: #fff;
  text-align: center;
  padding: 0.5rem;
  
  a {
    color: #fff;
  }
`;

const Footer = () => (
  <Container>
  <a href="https://github.com/russ430/basic-weather" rel="noreferrer noopener" target="_blank">
    <Icon fill="#fff" size="4rem" code={2000} />
  </a>
  <div>
    Icons made by <a href="https://www.flaticon.com/authors/pixel-perfect" target="_blank" rel="noreferrer noopener" title="Pixel perfect">Pixel perfect</a> from <a href="https://www.flaticon.com/" target="_blank" rel="noreferrer noopener" title="Flaticon">www.flaticon.com</a></div>
  <div>
    Icons made by <a href="https://www.flaticon.com/authors/freepik" target="_blank" rel="noreferrer noopener" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" target="_blank" rel="noreferrer noopener" title="Flaticon">www.flaticon.com</a></div>
</Container>
);

export default Footer;
