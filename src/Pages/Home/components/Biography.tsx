import { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import TimeLineItem from './TimeLineItem';
import { biography as data } from '../database/biography';
import myphoto from '../database/myphoto.jpg';

export default function Biography() {
  const [level, setLevel] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);

  const image = useRef<HTMLImageElement>(null);

  useEffect(() => {
    window.onresize = () => {
      if (image.current) setImageHeight(image.current.getBoundingClientRect().width * 1.5);
    };
    return () => {
      window.onresize = null;
    };
  }, []);

  return (
    <Container
      isLast={level === data.length - 1}
      style={{ height: imageHeight ? imageHeight : 'fit-content' }}>
      <img src={myphoto} ref={image} alt='ali memarzadeh' />
      <div id='bio-items-container'>
        {data
          .filter((_, j) => j <= level)
          .map((paragraph, i) => (
            <TimeLineItem key={'bio-' + i} passed={i < level} text={paragraph} />
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
  background: #03396d;
  width: 100%;
  height: min-content;
  display: flex;
  flex-direction: row;

  & > img {
    width: 40%;
    height: fit-content;
    flex-shrink: 0;
  }

  & #bio-items-container {
    padding: 20px 20px;
    padding-left: 0;
    overflow-y: auto;
    z-index: 1;
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
