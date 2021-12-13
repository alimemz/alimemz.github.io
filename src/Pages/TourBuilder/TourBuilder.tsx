import styled, { keyframes } from 'styled-components';
import under_development from '../../Gerenal Components/database/under_development.png';
import Header from '../../Gerenal Components/Header';

export default function TourBuilder() {
  console.log('im here');
  return (
    <>
      <Header />
      <Container>
        <img src={under_development} alt='under development' />
      </Container>
    </>
  );
}

const AnimSwing = keyframes`
     0% {transform: rotate(10deg)}
     50% { transform: rotate(-10deg)}
     100% { transform: rotate(10deg) }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  & img {
    margin-top: 50px;
    width: 30%;
    height: fit-content;
    transform-origin: 40.5% 5.7%;
    animation: ${AnimSwing} 5s ease-in-out infinite;
  }
`;
