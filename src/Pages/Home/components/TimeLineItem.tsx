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

const AnimMovingCircle = keyframes`
    1% {opacity:1;top:0;}
    99% {opacity:1;top:100%;}
`;

const AnimStaticCircleAppear = keyframes`
    from {background-color:#03396d;}
    to {background-color:white;}
`;

const AnimStaticCircleDisappear = keyframes`
    1% {background-color:white;}
    100% {background-color:#03396d;}
`;

type ItemProps = { passed: boolean };
const Item = styled.div`
  position: relative;
  background-color: inherit;
  margin-left: ${(props: ItemProps) => (props.passed ? '0px' : '3px')};
  border-left: ${(props: ItemProps) => (props.passed ? '3px solid white' : 'none')};

  & p {
    font-size: 20px;
    color: white;
    text-align: justify;
    vertical-align: text-top;
    margin: 0;
    padding-left: 20px;
    padding-bottom: 20px;
  }

  &::before,
  ::after {
    position: absolute;
    left: -0.9em;
    content: '';
    border: 2px solid white;
    border-radius: 50%;
    width: 1.6em;
    height: 1.6em;
  }
  &::before {
    top: 0;
    background-color: #03396d;
    /*                •current                  •past                     */
    animation-name: ${AnimStaticCircleAppear}, ${AnimStaticCircleDisappear};
    animation-duration: 1ms, 1ms;
    animation-delay: 0.5s, 0s;
    animation-direction: normal, normal;
    animation-fill-mode: forwards, forwards;
    animation-play-state: running, ${(props: ItemProps) => (props.passed ? 'running' : 'paused')};
  }
  &::after {
    background-color: white;
    z-index: 2;
    opacity: 0;
    animation: ${AnimMovingCircle} 0.5s linear normal forwards;
    animation-play-state: ${(props: ItemProps) => (props.passed ? 'running' : 'paused')};
  }
`;
