import styled from 'styled-components/macro';
import myPhoto from './myPhoto.png';
import WhatIKnow from './WhatIKnow';
import { useNavigate } from 'react-router';
import routes from '../routes';
import { useLocation } from 'react-router';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Parent>
      <Title>
        <div>
          <img src={myPhoto} />
          <h1>Ali Memarzadeh</h1>
        </div>
        <h2>Skill Presentation Website</h2>
      </Title>
      <WhatIKnow />
      <Nav>
        {Object.entries(routes).map((item) => {
          console.log(item);
          return (
            <NavBtn
              active={item[1].substring(1) === location.pathname.split('/').reverse()[0].toLowerCase()}
              onClick={() => navigate(item[1])}>
              {item[0]}
            </NavBtn>
          );
        })}
      </Nav>
    </Parent>
  );
}

const Parent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  position: relative;
  width: 100vw;
  min-height: 130px;
  height: fit-content;
  padding-bottom: 20px;
  box-sizing: border-box;
  margin: 0;
  background-color: #000c17;
`;

const Title = styled.div`
  width: fit-content;
  align-self: flex-start;

  & > div {
    width: fit-content;
    display: flex;
    flex-direction: row;

    & img {
      border-bottom-right-radius: 30%;
      width: 90px;
      height: 90px;
      flex-grow: 0;
      display: inline;
      background-color: #ecebeb;
    }
    & h1 {
      font-family: Base9;
      margin: 0;
      padding: 0;
      display: inline;
      white-space: nowrap;
      height: 90px;
      font-weight: 700;
      font-size: 52px;
      transform: scaleY(1.3) translateY(20px);
      color: #ecebeb;
    }
  }

  & h2 {
    font-family: Base9;
    width: 100%;
    font-size: 30px;
    word-spacing: 5px;
    letter-spacing: 3px;
    padding: 0;
    margin: 0;
    color: #ecebeb;
  }
`;

const Nav = styled.div`
  display: flex;
  flex-direction: row;
  width: fit-content;
  margin-right: 10px;
  align-self: flex-end;
  align-items: flex-end;
`;

const NavBtn = styled.button`
  background-color: ${(props: { active: boolean }) => (props.active ? '#03396d' : '#01203d')};
  border: none;
  color: white;
  font-weight: 500;
  margin-left: 0.42vmax;
  height: ${(props: { active: boolean }) => (props.active ? '52px' : '45px')};
  font-size: 20px;
  transition: background-color 0.2s, height 0.2s;

  &:hover {
    background-color: #03396d;
    height: 60px;
  }
`;
