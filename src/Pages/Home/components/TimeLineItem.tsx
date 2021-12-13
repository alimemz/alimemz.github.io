import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

type Props = {
  text: string;
  passed: boolean;
};
export default function TimeLineItem(props: Props) {
  const [isPassed, setIsPassed] = useState(false);

  useEffect(() => {
    setIsPassed(props.passed);
  }, [props.passed]);

  return (
    <Item passed={isPassed}>
      <p>{props.text}</p>
    </Item>
  );
}

const circleColor = '#d7df71';
const bgColor = '#03396d';

const AnimMovingCircle = keyframes`
    1% {opacity:1;top:0;}
    99% {opacity:1;top:100%;}
`;

const AnimStaticCircleAppear = keyframes`
    from {background-color:${bgColor};}
    to {background-color:${circleColor};}
`;

const AnimStaticCircleDisappear = keyframes`
    1% {background-color:${circleColor};}
    100% {background-color:${bgColor};}
`;

type ItemProps = { passed: boolean };
const Item = styled.div`
  position: relative;
  background-color: inherit;
  margin-left: ${(props: ItemProps) => (props.passed ? '0px' : '3px')};
  border-left: ${(props: ItemProps) => (props.passed ? '3px solid white' : 'none')};
  @media (max-width: 450px) {
    border-left: ${(props: ItemProps) => (props.passed ? '2px solid white' : 'none')};
  }

  & p {
    font-size: 20px;
    color: white;
    text-align: justify;
    vertical-align: text-top;
    margin: 0;
    padding-left: 20px;
    padding-bottom: 20px;
    @media (max-width: 450px) {
      font-size: 10px;
      padding-left: 12px;
    }
  }

  &::before,
  ::after {
    position: absolute;
    left: -15px;
    content: '';
    border-radius: 50%;
    width: 30px;
    height: 30px;
    @media (max-width: 450px) {
      width: 15px;
      height: 15px;
      left: -9px;
    }
  }
  &::before {
    top: 0;
    border: 3px solid white;
    background-color: ${bgColor};
    /*                •current                  •past                     */
    animation-name: ${AnimStaticCircleAppear}, ${AnimStaticCircleDisappear};
    animation-duration: 1ms, 1ms;
    animation-delay: 0.5s, 0s;
    animation-direction: normal, normal;
    animation-fill-mode: forwards, forwards;
    animation-play-state: running, ${(props: ItemProps) => (props.passed ? 'running' : 'paused')};
    @media (max-width: 450px) {
      border-width: 2px;
    }
  }
  &::after {
    background-color: ${circleColor};
    z-index: 2;
    opacity: 0;
    animation: ${AnimMovingCircle} 0.5s linear normal forwards;
    animation-play-state: ${(props: ItemProps) => (props.passed ? 'running' : 'paused')};
  }
`;
