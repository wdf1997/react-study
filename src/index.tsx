import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.less';
import Home from './page/home/index';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import Store from "../src/store/index";

// 自己写一个Redux middleware
const logger = (store: any) => (next: any) => (action: any) => {
  console.group(action.type)  // 用于设置分组信息的起始位置。
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd() // 方法用于设置分组信息的结束位置。
  return result
}

const store = createStore(
  Store,
  applyMiddleware(
    logger, 
    thunkMiddleware
  )
)
ReactDOM.render(
  <Provider store={store}>
    <Home />
  </Provider>,
  document.getElementById('root')
);
serviceWorker.unregister();
