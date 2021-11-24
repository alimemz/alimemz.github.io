import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "antd/dist/antd.css";
import reportWebVitals from './reportWebVitals';
import IMDB from './Pages/IMDB/IMDB'
import Home from './Pages/Home/Home'
// import {BrowserRouter, Route , Switch , Redirect} from 'react-router-dom'
import routes from './routes';


const App = () => {
  return (
    // <BrowserRouter>
    //   <Switch>
    //     <Route path={routes.ROOT}>
    //       <Redirect to={routes.HOME} />
    //     </Route>
    //     {/* @ts-ignore */}
    //     <Route path={routes.HOME}  component={Home} />
    //     {/* @ts-ignore */}
    //     <Route path={routes.IMDB} component={IMDB} />
    //   </Switch>
    // </BrowserRouter>
    <IMDB/>
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