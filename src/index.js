import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import GoodSmall from "./GoodSmall";

ReactDOM.render(<App />, document.getElementsByClassName('goods-cat')[0]);
ReactDOM.render(<App />, document.getElementsByClassName('goods-cat')[1]);
ReactDOM.render(<App />, document.getElementsByClassName('goods-cat')[2]);
ReactDOM.render(<GoodSmall />, document.getElementsByClassName('goods-cat')[2]);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
