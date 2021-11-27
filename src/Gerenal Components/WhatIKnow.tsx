import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components/macro';
import parchement from './parchement.png';
import rope_handle from './rope-handle.png';

export default function WhatIKnow() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [y, setY] = useState(0);

  useEffect(() => {
    window.addEventListener('resize', () => setWindowWidth(window.innerWidth));
  }, []);

  return (
    <Container
      style={{ transform: `translateY(${y}px)`, display: `${windowWidth < 1570 ? 'none' : 'flex'}` }}
      onClick={() => {
        const listHeight = document.getElementById('tech-list')?.getBoundingClientRect().height;
        setY(y?0:listHeight!+80);
      }}>
      <div id='parchement'>
        <ul id='tech-list'>
          <li>CSS</li>
          <li>JS</li>
          <li>React</li>
          <li>ThreeJS</li>
          <li>Styled Components</li>
        </ul>
        <img id='handle' src={rope_handle} />
      </div>

      <span style={{display: y?'none':'inline'}}>Click to see what technologies are used on this page</span>
    </Container>
  );
}

const handleAnimation = keyframes`
 0% {transform: rotate(20deg)}
 50% { transform: rotate(-20deg)}
 100% { transform: rotate(20deg) }
`;

const Container = styled.div`
  position: relative;
  width: 640px;
  transition: transform 1s;
  z-index: 1;
  & > div#parchement {
    display: flex;
    width: 640px;
    height: 1385px;
    position: absolute;
    top: -1360px;
    background: url(${parchement});
    background-size: cover;

    & img#handle {
      position: absolute;
      height: 70px;
      left: 50%;
      bottom: -60px;
      transform-origin: 50% 0;
      animation: ${handleAnimation} ease-in-out 3s both infinite;
    }

    & ul{
        align-self: flex-end;
        margin-bottom: 80px;
        margin-left:120px;
        color: red;
    }
  }
  & > span {
    position: absolute;
    top: 20px;
    width: 45%;
    opacity: 0;
    color: #0099ff;
    font-weight: 700;
    font-size: 25px;
    line-height: 27px;
    text-align: justify;
    transition: opacity 0.5s;
  }
  &:hover > span {
    opacity: 1;
  }
`;
