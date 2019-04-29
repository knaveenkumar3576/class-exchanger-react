import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import * as serviceWorker from './serviceWorker';
import { Router } from 'react-router-dom';

import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import createHistory from 'history/createBrowserHistory';

import authReducer from './store/reducers/auth'

import 'bootstrap/dist/css/bootstrap.css';

const history = createHistory();
const rootReducer = combineReducers({
    auth : authReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunk)
));


ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <App/>
        </Router>
    </Provider>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
