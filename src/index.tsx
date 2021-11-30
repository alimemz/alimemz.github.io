import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "antd/dist/antd.css";
import reportWebVitals from './reportWebVitals';
import IMDB from './Pages/IMDB/IMDB'
import Home from './Pages/Home/Home'
import {BrowserRouter, Route , Routes} from 'react-router-dom'
import routes from './routes';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes['Home']}  element={<Home/>} />
        <Route path={routes['IMDB']} element={<IMDB/>} />
      </Routes>
    </BrowserRouter>
    // <IMDB/>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
/* @ts-ignore */
reportWebVitals(); 