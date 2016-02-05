import thunk from 'redux-thunk'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'

import Application from './components/Application.jsx'
import SiteForm from './components/SiteForm.jsx'
import SitesContainer from './components/SitesContainer.jsx'

import * as reducers from './reducers'

const finalCreateStore = applyMiddleware(thunk)(createStore)
const store = finalCreateStore(reducers.paginate);

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path='/' component={Application}>
                <IndexRoute component={SiteForm} />
                <Route path='new' component={SiteForm} />
                <Route path='list' component={SitesContainer} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('container')
) 
