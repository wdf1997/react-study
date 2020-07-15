import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Home from './page/home/index'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  // <React.StrictMode>
    <Home />,
  // </React.StrictMode>,
  document.getElementById('root')
);
serviceWorker.unregister();
