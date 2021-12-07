import styled from 'styled-components';
import Header from '../../Gerenal Components/Header';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import routes from '../../routes';
import Biography from './components/Biography';
import ScoreGraph from './components/ScoreGraph';
import Collapsable from './components/Collapsable';

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(routes.Home);
  }, []);

  return (
    <>
      <Header />
      <div
        style={{
          width: '100%',
          height: 'fit-content',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 50,
        }}>
        <div style={{ height: 200, width: 200, flexShrink: 0 }}>
          <ScoreGraph
            backgroundColor='#ffffff'
            segmentsColor='#094120'
            segments={10}
            sThickness={40}
            dThickness={10}
            borderColor='#242323'
            loadTime={1500}
            score={7}
          />
        </div>
      </div>

      <Collapsable content={<Biography />} title='Short Biography'></Collapsable>
    </>
  );
}
