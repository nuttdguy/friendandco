import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';


// import App from './App'; TODO use for development
import App from './__testdir/App'; // use for testing server routes


// import ScrollToTop from './ScrollToTop';
import {HashRouter} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <HashRouter>
        <App></App>
    </HashRouter>,
    document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about services workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
