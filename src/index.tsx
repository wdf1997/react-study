import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import Home from './page/home/index'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Home />,
  document.getElementById('root')
);
serviceWorker.unregister();
