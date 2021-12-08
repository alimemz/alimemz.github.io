import { useRef } from 'react';
import styled from 'styled-components';

type Props = {
  content: JSX.Element;
  title: string;
};
export default function Collapsible(props: Props) {
  const contentEl = useRef<HTMLDivElement>(null);

  function clickJob() {
    if (contentEl.current) {
      const maxHeight = Number.parseInt(contentEl.current.style.maxHeight.replace('px', ''));
      contentEl.current.style.maxHeight = maxHeight > 0 ? '0px' : '2000px';
    }
  }

  return (
    <Container>
      <div className='top-element' onClick={clickJob}>
        {props.title}
      </div>
      <div className='content-element' ref={contentEl}>
        {props.content}
      </div>
      <div className='bottom-element' onClick={clickJob}></div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 95%;
  height: fit-content;

  & > div.top-element {
    width: 100%;
    height: 80px;
    background-color: #01203d;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    box-shadow: inset 0 0 10px 1px #2d6599;
    text-align: center;
    cursor: pointer;
    text-shadow: 0px 5px 5px #000000;
    font-family: MonotypeCorsiva;
    color: #ccd5e2;
    font-size: 40px;
    font-weight: 900;
  }
  & > div.bottom-element {
    position: relative;
    width: 100%;
    height: 80px;
    background-color: #01203d;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    border-top: 1px solid #0b0520;
    box-shadow: inset 0 0 10px 1px #2d6599;
    cursor: pointer;
  }

  & > div.content-element {
    width: 100%;
    height: fit-content;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.5s ease-in-out;
    transform-origin: 50% 50%;
  }
`;
