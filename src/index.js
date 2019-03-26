import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

localStorage.setItem('jwt', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiNTU3MDU4OmFkYTc3YTcyLTU2YTktNGExOS05YzIzLTdkNjZlNDgxMzg4MyIsImlzcyI6IkVYQUxBVEUiLCJleHAiOjE1NTM2MDg3ODg5ODd9.lkdWFPRHPmKuTzHc4oj5zkyMeZbG54MIrVORat3JMWw')

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
