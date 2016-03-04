import * as types from './types';
import { fromJS } from 'immutable';

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
        perPage: 12,
        current: 0,
        next: 1,
        previous: 0
    }
});

const appendError = (state, key) => {
    return state.set('errors', state.get('errors').push(key))
        .set('loading', false);
};

export default function (state = INITIAL_STATE, action) {
    
    switch (action.type) {
    case types.LOADING:
        return state.set('loading', true);

    case types.ADD_SITE_SUCCESS:
        return state.set('site', fromJS(action.site))
            .set('loading', false);

    case types.ADD_SITE_FAIL:
    case types.SITE_LIST_FAIL:
    case types.AUTHENTICATE_FAIL:
        return appendError(INITIAL_STATE, action.type);

    case types.SITE_LIST_SUCCESS:
        return state.set('sites', fromJS(action.sites))
            .set('loading', false)
            .set('pagination', fromJS(action.pagination));

    case types.SET_SITE:
        return state.set('siteEdit', fromJS(action.siteEdit))
            .set('siteIndex', action.siteIndex);

    case types.ADD_TAG_SUCCESS:
    case types.REMOVE_TAG_SUCCESS: {
        let sites = state.get('sites').toJS();
        sites[action.siteIndex] = action.site;
        return state.set('sites', fromJS(sites))
            .set('siteEdit', fromJS(action.site))
            .set('loading', false);
    }

    case types.ADD_TAG_FAIL:
    case types.REMOVE_TAG_FAIL:
        return appendError(state, action.type);

    case types.RESET_ERROR: {
        const errors = state.get('errors');
        const newList = errors.delete(errors.findIndex((item, index) => {
            if (item === action.error) {
                return index;
            }
        }));
        return state.set('errors', newList);
    }
    
    case types.AUTHENTICATE_SUCCESS: {
        let user = action.user;
        user.isAuthenticated = true;
        return state.set('user', fromJS(user))
            .set('redirectAfterLogin', true)
            .set('loading', false);
    }

    case types.SET_REDIRECT_OFF:
        return state.set('redirectAfterLogin', false);

    default:
        return state;
    }
}
