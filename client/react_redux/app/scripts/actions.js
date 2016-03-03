import * as types from './types';
import { SiteApi, UserApi } from './api';

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
            dispatch({
                type: types.ADD_SITE_SUCCESS,
                site: response.data.site
            });
        })
        .catch ((err) => {
            dispatch({
                type: types.ADD_SITE_FAIL
            });
        });
    };
}

export function getSites (paginationParams) {
    return (dispatch, getState) => {
        dispatch(LOADING);

        const pagination = paginationParams || getState().get('pagination').toJS();
        siteApi.find({
            pagination: pagination
        })
        .then((response) => {
            dispatch({
                type: types.SITE_LIST_SUCCESS,
                sites: response.data.sites,
                pagination: {
                    current: response.data.current,
                    next: response.data.next,
                    previous: response.data.previous,
                    page: pagination.page,
                    perPage: pagination.perPage
                }
            });
        })
        .catch((err) => {
            dispatch({
                type: types.SITE_LIST_FAIL
            });
        });
    };
}

export function addTag (tag) {
    return (dispatch, getState) => {
        dispatch(LOADING);
        const state = getState().toJS();

        siteApi.addTag({
            tag: tag,
            site: state.siteEdit,
            siteIndex: state.siteIndex,
            user: state.user
        })
        .then((response) => {
            dispatch({
                type: types.ADD_TAG_SUCCESS,
                site: response.data.site,
                siteIndex: state.siteIndex
            });
        })
        .catch((err) => {
            dispatch({
                type: types.ADD_TAG_FAIL
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
                type: types.REMOVE_TAG_SUCCESS,
                site: response.data.site,
                siteIndex: params.siteIndex,
                user: state.get('user').toJS()
            });
        })
        .catch((err) => {
            dispatch({
                type: types.REMOVE_TAG_FAIL
            });
        });
    };
}

export function setSiteEdit (site, siteIndex) {
    return {
        type: types.SET_SITE,
        siteEdit: site,
        siteIndex: siteIndex
    };
}

export function resetError (key) {
    return {
        type: types.RESET_ERROR,
        error: key
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
                type: types.AUTHENTICATE_SUCCESS,
                user: response.data.user
            });
        })
        .catch((err) => {
            dispatch({
                type: types.AUTHENTICATE_FAIL
            });
        });
    };
}

export function dontRedirectAgainWhileIsAutenticated () {
    return {
        type: types.SET_REDIRECT_OFF
    };
}