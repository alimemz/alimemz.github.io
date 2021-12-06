import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import TimeLineItem from './TimeLineItem';
import { biography as data } from '../database/biography';
import myphoto from '../database/myphoto.jpg';

export default function Biography() {
  const [level, setLevel] = useState(0);
  console.log(level);
  return (
    <Container isLast={level === data.length - 1}>
      <img src={myphoto} />
      <div id='bio-items-container'>
        {data
          .filter((_, j) => j <= level)
          .map((paragraph, i) => (
            <TimeLineItem passed={i < level} text={paragraph} />
          ))}
        <p id='continue' onClick={(_) => setLevel((prev) => (prev < data.length - 1 ? prev + 1 : prev))}>
          Continue...
        </p>
      </div>
    </Container>
  );
}

const InfiniteBuzz = keyframes`
    from {opacity:0}
    to {opacity:1}
`;
const Container = styled.div`
  margin: 0 auto;
  margin-top: 20px;
  background: #03396d;
  width: 95%;
  display: flex;
  flex-direction: row;

  & > img {
    width: 40%;
  }

  & #bio-items-container {
    padding: 40px;
    padding-left: 0;
  }

  & #continue {
    visibility: ${(props: { isLast: boolean }) => (props.isLast ? 'hidden' : 'visible')};
    font-size: 20px;
    color: white;
    font-weight: 700;
    margin-left: 30px;
    cursor: pointer;
    animation: ${InfiniteBuzz} 1s linear infinite alternate;
  }
`;
