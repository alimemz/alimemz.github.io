import styled from 'styled-components';
import ScoreGraph from '../components/ScoreGraph';
import skills from '../database/skills';

export default function Skills() {
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
              size={window.innerWidth > 450 ? 150 : 100}
              sColor='#660000'
              bgColor='white'
              dbgColor={bgcolor}
              textColor={textColor}
              strokeColor='black'
              dThickness={8}
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
              size={window.innerWidth > 450 ? 150 : 100}
              sColor='#005512'
              bgColor='white'
              dbgColor={bgcolor}
              textColor={textColor}
              strokeColor='black'
              dThickness={8}
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
              size={window.innerWidth > 450 ? 150 : 100}
              sColor='#b3b000'
              bgColor='white'
              dbgColor={bgcolor}
              textColor={textColor}
              strokeColor='black'
              dThickness={8}
              sThickness={30}
              loadTime={1000}
              segments={segments}
            />
          ))}
      </div>
    </Container>
  );
}
const bgcolor = '#c4cfe0';
const textColor = '#000c17';

const Container = styled.div`
  margin: 0 auto;
  background: ${bgcolor};
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  padding: 20px;

  & h1.group-title {
    color: ${textColor};
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
