import styled, { keyframes } from 'styled-components';

/** A cute and fastinating loading animation */
export default function Loading({ widthInPixel }: { widthInPixel: number }) {
  return (
    <Wrapper width={widthInPixel}>
      <div>
        <Segment thickness={widthInPixel / 10} color='#c1e64a' duration={1.5} />
        <Segment thickness={widthInPixel / 10} color='#66ec5a' duration={2} />
        <Segment thickness={widthInPixel / 10} color='#ec6b5a' duration={2.5} />
        <Segment thickness={widthInPixel / 10} color='#5a70ec' duration={3} />
      </div>
      <span>Loading data...</span>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 50px;
  & > div {
    position: relative;
    width: ${(props: { width: number }) => props.width}px;
    height: ${(props: { width: number }) => props.width}px;
  }
  & span {
    width: fit-content;
    font-size: 3vmax;
  }
`;

const spinAnimation = keyframes`
  0% {transform: rotate(0deg);}
  100% {transform: rotate(360deg);}
`;

type SegmentProps = { thickness: number; color: string; duration: number };
const Segment = styled.div`
  position: absolute;
  border-radius: 50%;
  width: 100%;
  height: 100%;
  border: ${(props: SegmentProps) => props.thickness}px solid transparent;
  mix-blend-mode: multiply;
  border-right: ${(props: SegmentProps) => props.thickness}px solid ${(props: SegmentProps) => props.color};
  animation: ${spinAnimation} ${(props: SegmentProps) => props.duration}s ease-in-out infinite;
`;
