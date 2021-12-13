import { useState } from 'react';
import styled from 'styled-components';

type Props = {
  content: JSX.Element;
  title: string;
};
export default function Collapsible(props: Props) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <Container isCollapsed={isCollapsed}>
      <div className='top-element' onClick={() => setIsCollapsed((prev) => !prev)}>
        {props.title}
      </div>
      <div className='content-element'>{!isCollapsed && props.content}</div>
      <div className='bottom-element' onClick={() => setIsCollapsed((prev) => !prev)}></div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 100%;
  height: fit-content;

  & > div.top-element,
  .bottom-element {
    width: 100%;
    height: 80px;
    background-color: #01203d;
    box-shadow: inset 0 0 10px 1px #2d6599;
    text-align: center;
    cursor: pointer;
    text-shadow: 0px 5px 5px #000000;
    font-family: MonotypeCorsiva;
    color: #ccd5e2;
    font-size: 40px;
    font-weight: 900;
    &:hover {
      color: #d7df71;
    }
    @media (max-width: 650px) {
      height: 40px;
      font-size: 25px;
    }
  }
  & > div.bottom-element {
    position: relative;
    border-top: 1px solid #0b0520;
  }

  & > div.content-element {
    width: 100%;
    height: fit-content;
    max-height: ${(props: { isCollapsed: boolean }) => (props.isCollapsed ? 0 : 10000)}px;
    overflow: hidden;
    transition: max-height 1000ms ease-in-out;
    transform-origin: 50% 50%;
  }
`;
