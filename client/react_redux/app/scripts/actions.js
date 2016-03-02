import * as types from './types';
import { SiteApi, UserApi } from './api';
import { getEndpoints } from './util';

const siteApi = new SiteApi();
const userApi = new UserApi();
const LOADING = {
    type: types.LOADING,
    meta: {
        remote: true
    }
};

export function addSite (site) {
    return (dispatch, getState) => {
        dispatch(LOADING);
        
        siteApi.create(site).then((response) => {
            let site = response.data.site;
            site.shortUrl = getEndpoints().SHORT_URL + site.code;
            dispatch({
                type: types.ADD_SITE_SUCCESS,
                site: site
            });
        })
        .catch ((err) => {
            dispatch({
                type: types.ADD_SITE_FAIL,
                error: {
                    message: err.data ? err.data.errors[0] : 'Connection Refused',
                    status: err.status
                }
            });
        });
    };
}

export function getSites () {
    return (dispatch, getState) => {
        dispatch(LOADING);
        const state = getState();

        siteApi.find({
            pagination: state.pagination
        })
        .then((response) => {
            dispatch({
                type: types.FILTER_SITES_SUCCESS,
                response: response
            });
        })
        .catch((err) => {});
    };
}

export function addTag (tag) {
    return (dispatch, getState) => {
        dispatch(LOADING);
        
        const state = getState();

        siteApi.addTag({
            tag: tag,
            site: state.site,
            siteIndex: state.siteIndex,
            user: state.user
        })
        .then((response) => {
            dispatch({
                type: types.TAG_ADDED,
                response: response,
                siteIndex: state.siteIndex
            });
        });
    };
}

export function removeTag (params) {
    return (dispatch, getState) => {
        dispatch(LOADING);

        const state = getState();

        siteApi.removeTag(params).then((response) => {
            dispatch({
                type: types.TAG_REMOVED,
                response: response,
                siteIndex: params.siteIndex,
                user: state.user
            });
        });
    };
}

export function setSite (site, siteIndex) {
    return {
        type: types.SET_SITE,
        site: site,
        siteIndex: siteIndex
    };
}


export function nextPage () {
    return {
        type: types.SET_NEXT_PAGE
    };
}

export function previousPage () {
    return {
        type: types.SET_PREVIOUS_PAGE
    };
}

export function refreshList () {
    return {
        type: types.SET_REFRESH_LIST
    };
}

export function authenticate (email, password) {
    return (dispatch, getState) => {
        dispatch(LOADING);

        userApi.authenticate(email, password)
        .then((response) => {
            dispatch({
                type: types.AUTHENTICATED,
                response: response
            });
        })
        .catch((err) => {
            dispatch({
                type: types.NOT_AUTHENTICATED,
                response: err
            });
        });
    };
}

export function dontRedirectAgainWhileIsAutenticated () {
    return {
        type: types.TURN_OFF_REDIRECT
    };
}