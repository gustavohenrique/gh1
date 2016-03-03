import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';

import App from './components/App.jsx';
import { SiteAddContainer } from './components/site/SiteAdd.jsx';
import SiteListContainer from './components/site/SiteListContainer.jsx';
import LoginContainer from './components/user/LoginContainer.jsx';
import reducer from './reducer';

import remoteActionMiddleware from './middleware';

const createStoreWithMiddleware = compose(
    applyMiddleware(remoteActionMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f // for redux-devtools-extension
)(createStore);

const store = createStoreWithMiddleware(reducer);

render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path='/' component={App}>
                <IndexRoute component={SiteAddContainer} />
                <Route path='new' component={SiteAddContainer} />
                <Route path='list' component={SiteListContainer} />
                <Route path='auth' component={LoginContainer} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('container')
) 
