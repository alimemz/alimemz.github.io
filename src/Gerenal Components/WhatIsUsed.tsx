import { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components/macro';
import parchement from './parchement.png';
import rope_handle from './rope-handle.png';

export default function WhatIsUsed() {
  const [left, setLeft] = useState(window.innerWidth / 2 - 320);
  const [y, setY] = useState(0);

  const element = useRef<HTMLDivElement>(null);
  const textContent = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (element.current)
      window.onresize = () =>
        setLeft((window.innerWidth - element.current!.getBoundingClientRect().width) / 2);
    return () => {
      window.onresize = null;
    };
  }, []);

  return (
    <Container
      style={{ transform: `translateY(${y}px)`, left: left }}
      ref={element}
      onClick={() => {
        if (textContent.current) setY(y ? 0 : textContent.current.getBoundingClientRect().height + 80);
      }}>
      <img id='parchement' src={parchement} alt='used-technologies' />
      <img
        id='handle'
        src={rope_handle}
        alt='handle'
        onClick={() => {
          if (textContent.current) setY(y ? 0 : textContent.current.getBoundingClientRect().height + 80);
        }}
      />
      <div className='textContent' ref={textContent}>
        <ul>
          <li>CSS</li>
          <li>JS</li>
          <li>React</li>
          <li>ThreeJS</li>
          <li>Styled Components</li>
        </ul>
      </div>

      <span>Click to see what technologies are used on this page</span>
    </Container>
  );
}

const handleAnimation = keyframes`
 0% {transform: rotate(20deg)}
 50% { transform: rotate(-20deg)}
 100% { transform: rotate(20deg) }
`;

const Container = styled.div`
  position: absolute;
  display: flex;
  top: -1380px;
  min-width: 640px;
  max-width: ${window.innerWidth - 20}px;
  transition: transform 1s;
  height: fit-content;
  z-index: 1000;
  & > img#parchement {
    width: auto;
    display: block;
    margin: 0;
    max-width: ${window.innerWidth - 20}px;
    height: 1385px;
  }

  & img#handle {
    position: absolute;
    display: block;
    margin: 0;
    height: 50px;
    left: 50%;
    bottom: -40px;
    transform-origin: 50% 0;
    animation: ${handleAnimation} ease-in-out 3s both infinite;
    &:hover ~ span {
      opacity: 1;
    }
  }

  & div.textContent {
    position: absolute;
    align-self: flex-end;
    margin-bottom: 80px;
    margin-left: 120px;
    color: red;
  }
  & > span {
    position: absolute;
    bottom: -50px;
    width: 100%;
    padding-right: 60%;
    opacity: 0;
    color: #0099ff;
    font-weight: 700;
    font-size: 18px;
    line-height: 27px;
    text-align: center;
    transition: opacity 0.5s;
    z-index: 1000;
  }
  &:hover > span {
    opacity: 1;
  }
`;
