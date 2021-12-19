import { useState } from 'react';
import styled from 'styled-components';

type Props = {
  content: JSX.Element;
  /**Initial collapsed state */
  initialState: boolean;
  title: string;
};
export default function Collapsible(props: Props) {
  const [isCollapsed, setIsCollapsed] = useState(props.initialState);

  return (
    <Container isCollapsed={isCollapsed}>
      <div className='header-element' onClick={() => setIsCollapsed((prev) => !prev)}>
        {props.title}
      </div>
      <div className='content-element'>{!isCollapsed && props.content}</div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 20px;
  width: 100%;
  height: fit-content;

  & > div.header-element {
    position: relative;
    left: ${(props: { isCollapsed: boolean }) => (props.isCollapsed ? '-2px' : '0')};
    width: ${(props: { isCollapsed: boolean }) => (props.isCollapsed ? '30%' : '100vw')};
    min-width: fit-content;
    background-color: #001529;
    text-align: center;
    cursor: pointer;
    text-shadow: 0px 5px 5px #000000;
    border-radius: ${(props: { isCollapsed: boolean }) => (props.isCollapsed ? '0 10px 10px 0' : '0px')};
    font-family: MonotypeCorsiva;
    color: #ccd5e2;
    white-space: nowrap;
    font-size: 2.5vmax;
    font-weight: 900;
    padding: 10px 30px 10px;
    transition: width 0.5s, border-radius 0.5s;
    &:hover {
      width: ${(props: { isCollapsed: boolean }) => (props.isCollapsed ? '40' : '100')}%;
      color: #d7df71;
    }
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
