import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppRouter from "./components/AppRouter"
import * as serviceWorker from './serviceWorker';
import { ContextProvider, AppContext } from './components/app-context.js';

ReactDOM.render(<ContextProvider><AppContext.Consumer><AppRouter /></AppContext.Consumer></ContextProvider>, document.getElementById('root'));

// <ContextProvider><AppContext.Consumer><AppRouter /></AppContext.Consumer></ContextProvider>
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
