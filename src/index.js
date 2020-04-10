import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios'
import * as serviceWorker from './serviceWorker';

//-----------配置baseUrl--------------------

axios.defaults.baseURL = process.env.NODE_ENV === "development" ? 'http://localhost:4000' : 'http://106.13.118.135:4000'
//----------------------------------

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
