import thunk from 'redux-thunk';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import { getEndpoints } from './util';
import Application from './components/main/Application.jsx';
import SiteForm from './components/sites/SiteForm.jsx';
import SitesContainer from './components/sites/SitesContainer.jsx';
import LoginContainer from './components/users/LoginContainer.jsx';
import * as reducers from './reducers';

const finalCreateStore = compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f // for redux-devtools-extension
)(createStore);
const store = finalCreateStore(reducers.mainReducer);


store.dispatch({
    type: 'SET_ENDPOINTS',
    endpoints: getEndpoints(window)
});

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path='/' component={Application}>
                <IndexRoute component={SiteForm} />
                <Route path='new' component={SiteForm} />
                <Route path='list' component={SitesContainer} />
                <Route path='auth' component={LoginContainer} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('container')
) 
