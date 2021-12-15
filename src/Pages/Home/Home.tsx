import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import Header from '../../Gerenal Components/Header';
import routes from '../../routes';
import Biography from './components/Biography';
import Collapsible from './components/Collapsible';
import Skills from './components/Skills';
import dream_job from './database/dream_job.png';

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
              “A good job, occupation or career for a person, is the one that makes him/her impatient during
              the last hours of weekend, such that he/she cannot wait to get back to it.”
            </p>
            <p>
              This has been my motto, aim and dream all through my life. I believe that there is such a
              magical field of occupation for everyone, however, pinpointing it is a matter of challenge
              sometimes spanning for decades of life or even get dropped for good. I, not being an exception,
              have always been seeking such an occupation...and finally I found it rightfully in "Programming"
              and "Software Development".
            </p>
            <p>
              {' '}
              This website is created merely to present my development skills to whom it may concern. Also, I
              intend to maintain, update or add something to it, anytime I learn something new.
            </p>
            <p>
              Below you can find a short biography of me along with a self-assessment of my development
              skills.
            </p>
          </div>
          <img src={dream_job} alt='dream_job' />
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
