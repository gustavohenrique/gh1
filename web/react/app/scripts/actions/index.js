import * as api from '../api';
import * as types from '../constants';

export function getSites () {
    return (dispatch, getState) => {
        dispatch({ type: types.REQUEST_START });
        const options = {
            pagination: getState().pagination
        };

        return api.getSites(options, (response) => {
            dispatch({
                type: types.FILTER_SITES_SUCCESS,
                sites: response.content,
                pagination: {
                    current: response.current,
                    next: response.next,
                    previous: response.previous
                }
            });
        });
    };
}

export function nextPage () {
    return { type: types.SET_NEXT_PAGE };
}

export function previousPage () {
    return { type: types.SET_PREVIOUS_PAGE };
}

export function refreshList () {
    return { type: types.SET_REFRESH_LIST };
}

export function addTag (tag) {
    return (dispatch, getState) => {
        dispatch({ type: types.REQUEST_START });
        const params = {
            tag: tag,
            site: getState().site,
            siteIndex: getState().siteIndex
        };
        return api.addTag(params, (response) => {
            return dispatch({
                type: types.TAG_ADDED,
                site: response,
                siteIndex: params.siteIndex
            });
        });
    };
}

export function removeTag (params) {
    return (dispatch, getState) => {
        dispatch({ type: types.REQUEST_START });
        return api.removeTag(params, (response) => {
            return dispatch({
                type: types.TAG_REMOVED,
                site: response,
                siteIndex: params.siteIndex
            });
        });
    };
}

export function addSite (url) {
    return (dispatch) => {
        dispatch({ type: types.REQUEST_START });
        
        return api.addSite(url, (response) => {
            return dispatch({
                type: types.SITE_ADDED,
                site: response
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
