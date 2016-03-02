import * as types from './types';
import { List, Map, fromJS } from 'immutable';

export const INITIAL_STATE = fromJS({
    loading: false,
    sites: [],
    site: {},
    siteEdit: {},
    user: {},
    redirectAfterLogin: false,
    errors: [],
    pagination: {
        page: 1,
        perPage: 2,
        current: 0,
        next: 1,
        previous: 0
    }
});

const appendError = (state, key) => {
    return state.set('errors', state.get('errors').push(key))
        .set('loading', false);
}

export default function (state = INITIAL_STATE, action) {
    
    switch (action.type) {
        case types.LOADING:
            return state.set('loading', true);

        case types.ADD_SITE_SUCCESS:
            return INITIAL_STATE.set('site', fromJS(action.site));

        case types.ADD_SITE_FAIL:
        case types.SITE_LIST_FAIL:
            return appendError(INITIAL_STATE, action.type);

        case types.SITE_LIST_SUCCESS:
            return INITIAL_STATE.set('sites', fromJS(action.sites))
                .set('pagination', fromJS(action.pagination));

        case types.SET_SITE:
            return state.set('siteEdit', fromJS(action.siteEdit))
                .set('siteIndex', action.siteIndex);

        case types.ADD_TAG_SUCCESS:
            let sites = state.get('sites').toJS();
            sites[action.siteIndex] = action.site;
            return state.set('sites', fromJS(sites));

        case types.ADD_TAG_FAIL:
            return appendError(state, action.type);

        case types.RESET_ERROR:
            const errors = state.get('errors');
            const newList = errors.delete(errors.findIndex((item, index) => {
                if (item === action.error) {
                    return index;
                }
            }));
            return state.set('errors', newList);

        
/*
        case types.AUTHENTICATED:
            let user = action.response.data.user;
            user.isAuthenticated = true;
            return {
                ...markAsFinishedRequest(state),
                user: user,
                redirectAfterLogin: true
            };

        case types.NOT_AUTHENTICATED:
            return {
                ...markAsFinishedRequest(state),
                errors: action.response.data
            };

        case types.TURN_OFF_REDIRECT:
            return {
                ...markAsFinishedRequest(state),
                redirectAfterLogin: false
            };
        */
        default:
            return state;
    }
}
