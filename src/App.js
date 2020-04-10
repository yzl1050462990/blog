import React from 'react';
// import logo from './logo.svg';
import BlogRouter from './router/index'
import './App.css';
import 'antd/dist/antd.css';
import {Provider} from 'react-redux'
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <BlogRouter></BlogRouter>
    </Provider>
  );
}

export default App;
