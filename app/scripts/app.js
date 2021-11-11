import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app-main';
import Navbar from './components/navbar';
import 'whatwg-fetch';
require('es6-promise').polyfill();

window.React = React;

ReactDOM.render( < App / > , document.getElementById('app'));
ReactDOM.render( <Navbar isUserLoggedIn={false} / >, document.getElementById('navbar'));
