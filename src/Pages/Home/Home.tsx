import styled from 'styled-components';
import Header from '../../Gerenal Components/Header';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import routes from '../../routes';
import Biography from './components/Biography';

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(routes.Home);
  }, []);

  return (
    <>
      <Header />
      <Biography />
    </>
  );
}
