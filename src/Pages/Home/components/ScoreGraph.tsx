import styled, { keyframes } from 'styled-components';

type Props = {
  segments: number;
  /** number of segments to fill */
  score: number;
  /**Width of graph (px) */
  size: number;
  /** Subject to write bellow graph*/
  text: string;
  /** Image icon to set in the inner circle*/
  image: string;
  /** Details to show on modal upon click*/
  details?: string[];
  /**Thickness of segments (% of radius)*/
  sThickness: 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90;
  /**Thickness of segments divider (px)*/
  dThickness: number;
  /** Filled segments color*/
  sColor: string;
  /** Background color of inner circle and unfilled segments*/
  bgColor: string;
  /** Background color of dividers (usually same as parent of graph)*/
  dbgColor: string;
  /** Text color*/
  textColor: string;
  /** Borders color*/
  strokeColor: string;
  /**Duration that conic gradient fills the scored segments (ms) */
  loadTime: number;
  onClick: (details: string[] | undefined) => void;
};

export default function ScoreGraph(props: Props) {
  return (
    <Container _props={props} onClick={() => props.onClick(props.details)}>
      <div className='graphics'>
        {/* Sectors */}
        <span className='outer-circle'></span>

        {/* Sector Dividers */}
        {(() => {
          let dividers = [];
          for (let i = 0; i < props.segments; i++) {
            dividers[i] = (
              <span
                className='divider'
                key={`divider-${i}`}
                style={{ transform: `rotate(${180 + i * (360 / props.segments)}deg)` }}></span>
            );
          }
          return dividers;
        })()}

        {/* Inner circle */}
        <span className='inner-circle'>
          <img src={props.image} alt={props.text} />
        </span>
      </div>

      {/* Title */}
      <h2>{props.text}</h2>
    </Container>
  );
}

const AnimLoad = (props: Props) => {
  const finalProgress = (props.score / props.segments) * 100;
  let x = '';
  for (let i = 0; i <= finalProgress; i++) {
    x += `${i}% {background-image:${gradientArray(props, i)}};`;
  }
  x += `100% {background-image:${gradientArray(props, finalProgress)}};`;
  return keyframes`${x}`;
};

const Container = styled.div`
  width: ${(props: { _props: Props }) => props._props.size}px;
  min-height: fit-content;
  cursor: pointer;
  margin: 20px;

  & div.graphics {
    width: ${(props: { _props: Props }) => props._props.size}px;
    min-height: ${(props: { _props: Props }) => props._props.size}px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    & span.outer-circle {
      position: absolute;
      top: 0;
      left: 0;
      width: ${(props: { _props: Props }) => props._props.size}px;
      height: ${(props: { _props: Props }) => props._props.size}px;
      border-radius: 50%;
      background-color: ${(props: { _props: Props }) => props._props.bgColor};
      border: 3px solid ${(props: { _props: Props }) => props._props.strokeColor};
      animation: ${(props: { _props: Props }) => AnimLoad(props._props)}
        ${(props: { _props: Props }) => props._props.loadTime}ms 1s ease-out forwards;
    }

    & span.divider {
      position: absolute;
      top: 0%;
      left: calc(50%-4px);
      transform-origin: bottom center;
      width: ${(props: { _props: Props }) => props._props.dThickness}px;
      height: ${(props: { _props: Props }) => props._props.size / 2}px;
      border-left: 3px solid ${(props: { _props: Props }) => props._props.strokeColor};
      border-right: 3px solid ${(props: { _props: Props }) => props._props.strokeColor};
      background-color: ${(props: { _props: Props }) => props._props.dbgColor};
      z-index: 0;
    }

    & span.inner-circle {
      position: absolute;
      width: ${(props: { _props: Props }) => (100 - props._props.sThickness) * 0.01 * props._props.size}px;
      height: ${(props: { _props: Props }) => (100 - props._props.sThickness) * 0.01 * props._props.size}px;
      background-color: ${(props: { _props: Props }) => props._props.bgColor};
      border-radius: 50%;
      border: 3px solid ${(props: { _props: Props }) => props._props.strokeColor};
      z-index: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      & img {
        width: 70%;
        height: 70%;
      }
    }
  }

  & h2 {
    color: ${(props: { _props: Props }) => props._props.textColor};
    margin-top: 5px;
    text-align: center;
    @media (max-width: 450px) {
      font-size: 15px;
    }
  }
`;

function gradientArray(props: Props, progressPercent: number) {
  const result = `conic-gradient(from 0deg,${props.sColor} ${progressPercent}%,white ${progressPercent}%,white 360deg);`;
  return result;
}
