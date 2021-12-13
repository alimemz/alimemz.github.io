import { Modal } from 'antd';
import { useState } from 'react';
import styled from 'styled-components';
import ScoreGraph from '../components/ScoreGraph';
import skills from '../database/skills';

export default function Skills() {
  const [details, setDetails] = useState<string[] | undefined>(undefined);

  const segments = 8;
  const adjustScore = (score: number) => Math.round(score * 0.01 * segments);

  return (
    <Container>
      <h1 className='group-title'>Core Development Technologies:</h1>
      <div className='graphs core'>
        {skills
          .filter((item) => item.tag === 'core')
          .map((item) => (
            <ScoreGraph
              key={`skill-${item.title}`}
              text={item.title}
              score={adjustScore(item.score)}
              image={item.icon}
              details={item.details}
              onClick={(detail) => setDetails(detail)}
              size={window.innerWidth > 450 ? 150 : 100}
              sColor='#660000'
              bgColor='white'
              dbgColor='#03396d'
              textColor='white'
              strokeColor='black'
              dThickness={10}
              sThickness={30}
              loadTime={1000}
              segments={segments}
            />
          ))}
      </div>
      <h1 className='group-title'>Libraries/Auxiliary Skills:</h1>
      <div className='graphs aux'>
        {skills
          .filter((item) => item.tag === 'aux')
          .map((item) => (
            <ScoreGraph
              key={`skill-${item.title}`}
              text={item.title}
              score={adjustScore(item.score)}
              image={item.icon}
              details={item.details}
              onClick={(detail) => setDetails(detail)}
              size={window.innerWidth > 450 ? 150 : 100}
              sColor='#005512'
              bgColor='white'
              dbgColor='#03396d'
              textColor='white'
              strokeColor='black'
              dThickness={10}
              sThickness={30}
              loadTime={1000}
              segments={segments}
            />
          ))}
      </div>
      <h1 className='group-title'>Miscellaneous Relevant Skills:</h1>
      <div className='graphs misc'>
        {skills
          .filter((item) => item.tag === 'misc')
          .map((item) => (
            <ScoreGraph
              key={`skill-${item.title}`}
              text={item.title}
              score={adjustScore(item.score)}
              image={item.icon}
              details={item.details}
              onClick={(detail) => setDetails(detail)}
              size={window.innerWidth > 450 ? 150 : 100}
              sColor='#b3b000'
              bgColor='white'
              dbgColor='#03396d'
              textColor='white'
              strokeColor='black'
              dThickness={10}
              sThickness={30}
              loadTime={1000}
              segments={segments}
            />
          ))}
      </div>

      {/* Details */}
      <Modal
        visible={details !== undefined}
        onCancel={() => setDetails(undefined)}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}>
        <ul>
          {details?.map((item) => (
            <li>{item}</li>
          ))}
        </ul>
      </Modal>
    </Container>
  );
}

const Container = styled.div`
  margin: 0 auto;
  background: #03396d;
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  padding: 20px;

  & h1.group-title {
    color: white;
    text-decoration: underline;
    @media (max-width: 450px) {
      font-size: 5vw;
    }
  }

  & div.graphs {
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
`;
