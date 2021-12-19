import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import Header from '../../Gerenal Components/Header';
import routes from '../../routes';
import Biography from './components/Biography';
import Collapsible from './components/Collapsible';
import Skills from './components/Skills';
import { images } from '../../media';

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(routes.Home);
  }, [navigate]);

  return (
    <div style={{ width: '100%' }}>
      <Header />
      <Body>
        <Intro>
          <div className='texts'>
            <p id='motto'>
              “An ideal job, occupation or career for a person, is the one that makes him/her miss it during
              weekends or holidays.”
            </p>
            <p>
              This short and seemingly simple sentence has been my motto, aim and dream all through my life.
              It may seem obvious to some, but try to remember the mood of people around you in the last hours
              of weekends... Aren't most of the them somehow mourning because of getting back to work?!
            </p>
            <p>
              I believe that there is such an ideal (or better said: magical) field of occupation for
              everyone, however, pinpointing it is a matter of challenge sometimes spanning for decades of
              life or even in most cases, get dropped for good totally.
            </p>
            <p>
              I, not being an exception, have always been seeking such an occupation, the short story of it
              you can find in the Short Biography section below...But finally I managed to pinpoint it
              rightfully: "Programming" and "Software Development".
            </p>
            <p>
              This website is created merely to present my development skills to whom it may concern. Also, I
              intend to maintain, update or add something to it, anytime I learn something new.
            </p>
            <p>
              Below you can find a short biography of me along with a self-assessment of my development
              skills.
            </p>
          </div>
          <img src={images.dream_job} alt='dream_job' />
        </Intro>
        <Collapsible content={<Skills />} title='Skills Self Assessment' initialState={true}></Collapsible>

        <Collapsible content={<Biography />} title='A Short Biography' initialState={true}></Collapsible>
      </Body>
    </div>
  );
}

const Body = styled.div`
  width: 100%;
  margin: 0 auto;
  padding-bottom: 20px;
  background-color: #c4cfe0;
  border-left: 2.5vw solid #001529;
`;

const Intro = styled.div`
  padding: 20px 0 20px 20px;
  display: flex;
  flex-direction: row;
  @media (max-width: 1200px) {
    padding: 10px 0 10px 10px;
    flex-direction: column-reverse;
  }

  & .texts {
    font-size: 20px;
    font-weight: 600;
    padding: 20px;
    line-height: 40px;
    text-align: justify;
    @media (max-width: 500px) {
      font-size: 12px;
      font-weight: 500;
      line-height: 20px;
    }
  }

  & > div > p:first-child {
    font-weight: 800;
  }
  & > img {
    display: block;
    width: auto;
    height: fit-content;
    flex-shrink: 0;
  }
`;
