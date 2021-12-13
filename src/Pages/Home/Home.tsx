import Header from '../../Gerenal Components/Header';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import routes from '../../routes';
import Biography from './components/Biography';
import Collapsible from './components/Collapsible';
import Skills from './components/Skills';
import styled from 'styled-components';

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(routes.Home);
  }, [navigate]);

  return (
    <div style={{ width: '100%' }}>
      <Header />
      <Body>
        <Collapsible content={<Biography />} title='Short Biography'></Collapsible>
        <Collapsible content={<Skills />} title='Skills'></Collapsible>
      </Body>
    </div>
  );
}

const Body = styled.div`
  width: 100%;
  margin: 0 auto;
  background-color: #c4cfe0;
`;
{
  /* <p>I have always believed in one thing during my life:</p>
<p>
  A good job, occupation or activity is the one that makes you be happy at the last hours of weekend
  and look forward to get back to it.
</p>
<p>
  As long as memory helps, I have always been seeking such an occupation...and finally I found it
  rightfully in "Programming" and "Software Development".
</p>
<p>
  This website is created merely to present my development skills to whom it may concern. Also I
  intend to maintain,update or add something to it, anytime I learn something new.{' '}
</p>
<p>
  Below you can find a short biography of me along with a self assessment of my development skills.
</p> */
}
