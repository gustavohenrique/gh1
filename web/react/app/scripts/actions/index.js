import * as api from '../api'

export function getSites () {
    return function (dispatch, getState) {
        dispatch({ type: 'REQUEST_START' });
        const options = {
            pagination: getState().pagination
        }

        return api.getSites(options, function (response) {
            dispatch({
                type: 'FILTER_SITES_SUCCESS',
                sites: response.content,
                pagination: {
                    current: response.current,
                    next: response.next,
                    previous: response.previous
                }
            });
        });
    }
}

export function nextPage () {
    return { type: 'SET_NEXT_PAGE' }
}

export function previousPage () {
    return { type: 'SET_PREVIOUS_PAGE' }
}

export function refreshList () {
    return { type: 'SET_REFRESH_LIST' }
}

export function addTag (tag) {
    return function (dispatch, getState) {
        dispatch({ type: 'REQUEST_START' });
        const params = {
            tag: tag,
            site: getState().site,
            siteIndex: getState().siteIndex
        }
        return api.addTag(params, function (response) {
            return dispatch({
                type: 'TAG_ADDED',
                site: response,
                siteIndex: params.siteIndex
            });
        });
    }
}

export function removeTag (params) {
    return function (dispatch, getState) {
        dispatch({ type: 'REQUEST_START' });
        return api.removeTag(params, function (response) {
            return dispatch({
                type: 'TAG_REMOVED',
                site: response,
                siteIndex: params.siteIndex
            })
        });
    }
}

export function addSite (url) {
    return function (dispatch) {
        dispatch({ type: 'REQUEST_START' });
        
        return api.addSite(url, function (response) {
            return dispatch({
                type: 'SITE_ADDED',
                site: response
            })
        });
    }
}

export function setSite (site, siteIndex) {
    return {
        type: 'SET_SITE',
        site: site,
        siteIndex: siteIndex
    }
}
