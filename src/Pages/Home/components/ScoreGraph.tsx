import styled, { keyframes } from 'styled-components';

type Props = {
  segments: number;
  /**Thickness of segments (% of radius)*/
  sThickness: 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90;
  /**Thickness of segments divider (px)*/
  dThickness: number;
  text?: string;
  image?: string;
  /** number of segments to fill */
  score: number;
  segmentsColor: string;
  borderColor: string;
  backgroundColor: string;
  /**milli-seconds*/
  loadTime: number;
};

export default function ScoreGraph(props: Props) {
  return (
    <Container _props={props}>
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
      <span
        className='inner-circle'
        style={{ width: `${100 - props.sThickness}%`, height: `${100 - props.sThickness}%` }}></span>

      {/* Inner content */}
      <span
        className='inner-content'
        style={{
          width: `${0.7 * (100 - props.sThickness)}%`,
          height: `${0.7 * (100 - props.sThickness)}%`,
        }}></span>
    </Container>
  );
}

const AnimLoad = (props: Props) => {
  const finalProgress = (props.score * 100) / props.segments;
  let x = '';
  for (let i = 0; i <= finalProgress; i++) {
    x += `${i}% {background-image:${gradientArray(props, i)}};`;
  }
  x += `100% {background-image:${gradientArray(props, finalProgress)}};`;
  return keyframes`${x}`;
};

const Container = styled.div`
  min-width: 100%;
  min-height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  & > span.outer-circle {
    position: absolute;
    top: 0;
    left: 0;
    min-width: 100%;
    min-height: 100%;
    border-radius: 50%;
    border: 3px solid ${(props: { _props: Props }) => props._props.borderColor};
    animation: ${(props: { _props: Props }) => AnimLoad(props._props)}
      ${(props: { _props: Props }) => props._props.loadTime}ms 1s ease-out forwards;
    z-index: -1;
  }

  & > span.divider {
    position: absolute;
    top: 0%;
    left: calc(50%-4px);
    transform-origin: bottom center;
    width: ${(props: { _props: Props }) => props._props.dThickness}px;
    min-height: 50%;
    border-left: 3px solid ${(props: { _props: Props }) => props._props.borderColor};
    border-right: 3px solid ${(props: { _props: Props }) => props._props.borderColor};
    background-color: ${(props: { _props: Props }) => props._props.backgroundColor};
    z-index: 0;
  }

  & > span.inner-circle {
    position: absolute;
    background-color: ${(props: { _props: Props }) => props._props.backgroundColor};
    border-radius: 50%;
    border: 3px solid ${(props: { _props: Props }) => props._props.borderColor};
    z-index: 1;
  }

  & > span.inner-content {
    background-image: url(${(props: { _props: Props }) => props._props.image});
    background-size: contain;
    z-index: 2;
  }
`;

function gradientArray(props: Props, progressPercent: number) {
  const result = `conic-gradient(from 0deg,${props.segmentsColor} ${progressPercent}%,white ${progressPercent}%,white 360deg);`;
  return result;
}
