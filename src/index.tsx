import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import { defineCustomElements } from '@ionic/pwa-elements/loader';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import{Provider} from 'react-redux';
import Store from "./Store/Store";
// import './styles/style.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={Store} ><App /></Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
