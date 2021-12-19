import { useLocation, useNavigate } from 'react-router';
import styled from 'styled-components/macro';
import routes from '../routes';
import { images } from '../media';
import PageDesciption from './PageDescription';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div style={{ width: '100%' }}>
      {/* <WhatIsUsed /> */}
      <Parent>
        <Title>
          <div>
            <img src={images.header_title} alt='author' />
            <h1>Ali Memarzadeh</h1>
          </div>
          <h2>Skill Presentation Website</h2>
        </Title>

        <Nav>
          {Object.entries(routes).map((item) => {
            return (
              <NavBtn
                key={item[0]}
                active={item[1].substring(1) === location.pathname.split('/').reverse()[0].toLowerCase()}
                onClick={() => navigate(item[1])}>
                {item[0]}
              </NavBtn>
            );
          })}
        </Nav>
      </Parent>
      <PageDesciption />
    </div>
  );
}

const Parent = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  width: 100%;
  min-height: 130px;
  height: fit-content;
  padding-bottom: 20px;
  box-sizing: border-box;
  margin: 0;
  background-color: #000c17;
  @media (max-width: 970px) {
    flex-direction: column;
  }
`;

const Title = styled.div`
  width: fit-content;
  margin-left: 10px;
  margin-top: 10px;
  align-self: flex-start;

  & > div {
    width: fit-content;
    display: flex;
    flex-direction: row;

    & img {
      border-radius: 50%;
      width: 90px;
      height: 90px;
      display: inline;
      background-color: #ecebeb;
      @media (max-width: 450px) {
        width: 20vw;
        height: 20vw;
      }
    }
    & h1 {
      font-family: Base9;
      width: 100%;
      margin: 0;
      padding: 0;
      display: inline;
      white-space: nowrap;
      height: 90px;
      font-weight: 700;
      font-size: 52px;
      transform: scaleY(1.3) translateY(20px);
      color: #ecebeb;
      @media (max-width: 450px) {
        font-size: 8vw;
        transform: translateY(30px);
      }
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
    @media (max-width: 450px) {
      font-size: 5.3vw;
      letter-spacing: 1px;
      transform: translateY(-10px);
    }
  }
`;

const Nav = styled.div`
  display: flex;
  flex-direction: row;
  width: fit-content;
  margin-right: 10px;
  align-self: flex-end;
  align-items: flex-end;
  @media (max-width: 975px) {
    margin: 0 auto;
  }
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
  @media (max-width: 625px) {
    font-size: 15px;
  }

  &:hover {
    background-color: #03396d;
    height: 60px;
  }
`;
