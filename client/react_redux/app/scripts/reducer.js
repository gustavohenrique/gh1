import * as types from './types';
import { List, Map, fromJS } from 'immutable';

export const INITIAL_STATE = fromJS({
    loading: false,
    sites: [],
    site: {},
    user: {},
    redirectAfterLogin: false,
    siteError: {},
    pagination: {
        page: 1,
        perPage: 12,
        current: 0,
        next: 1,
        previous: 0
    }
});

export default function (state = INITIAL_STATE, action) {
    
    switch (action.type) {
        case types.LOADING:
            return state.set('loading', fromJS(true));

        case types.ADD_SITE_SUCCESS:
            return INITIAL_STATE.set('site', fromJS(action.site));

        case types.ADD_SITE_FAIL:
            return INITIAL_STATE.set('siteError', fromJS(action.error));

/*
        case types.REQUEST_START:
            let isWaiting = action.hasOwnProperty('isWaitingRequest') ? action.isWaitingRequest : false;
            return {
                ...state,
                isWaitingRequest: isWaiting,
                isFetching: true
            };

        case types.FILTER_SITES_SUCCESS:
            const pagination = {
                current: action.response.data.current,
                next: action.response.data.next,
                previous: action.response.data.previous
            };
            return {
                ...markAsFinishedRequest(state),
                sites: action.response.data.sites,
                site: null,
                pagination: Object.assign({}, state.pagination, pagination)
            };

        case types.SET_PREVIOUS_PAGE:
            const previousPage = state.pagination.previous;
            return {
                ...state,
                pagination: Object.assign({}, state.pagination, { page: previousPage })
            };

        case types.SET_NEXT_PAGE:
            const nextPage = state.pagination.next;
            return {
                ...state,
                pagination: Object.assign({}, state.pagination, { page: nextPage })
            };

        case types.SET_REFRESH_LIST:
            return {
                ...state,
                pagination: Object.assign({}, state.pagination, { page: 1 })
            };

        case types.SET_SITE:
            return {
                ...state,
                site: action.site,
                siteIndex: action.siteIndex
            };

        

        case types.TAG_ADDED:
        case types.TAG_REMOVED:
            let sites = state.sites.slice(0); // returns new array
            sites[action.siteIndex] = action.response.data.site;
            return {
                ...markAsFinishedRequest(state),
                sites: sites
            };

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
