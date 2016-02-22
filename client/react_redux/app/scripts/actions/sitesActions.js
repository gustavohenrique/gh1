import * as constants from '../constants';
import { showLoadingBar } from './';
import { SiteApi } from '../api';

const apiClient = (state) => {
    return new SiteApi(state.endpoints);
};

export function getSites () {
    return (dispatch, getState) => {
        dispatch(showLoadingBar());
        const state = getState();

        apiClient(state).find({
            pagination: state.pagination
        })
        .then((response) => {
            dispatch({
                type: constants.FILTER_SITES_SUCCESS,
                response: response
            });
        })
        .catch((err) => {});
    };
}

export function addSite (url, userId) {
    return (dispatch, getState) => {
        dispatch(showLoadingBar());
        
        apiClient(getState()).create(url, userId).then((response) => {
            dispatch({
                type: constants.SITE_ADDED,
                response: response
            });
        })
        .catch ((err) => {});
    };
}

export function addTag (tag) {
    return (dispatch, getState) => {
        dispatch(showLoadingBar());
        
        const state = getState();

        apiClient(state).addTag({
            tag: tag,
            site: state.site,
            siteIndex: state.siteIndex,
            user: state.user
        })
        .then((response) => {
            dispatch({
                type: constants.TAG_ADDED,
                response: response,
                siteIndex: state.siteIndex
            });
        });
    };
}

export function removeTag (params) {
    return (dispatch, getState) => {
        dispatch(showLoadingBar());

        const state = getState();

        apiClient(state).removeTag(params).then((response) => {
            dispatch({
                type: constants.TAG_REMOVED,
                response: response,
                siteIndex: params.siteIndex,
                user: state.user
            });
        });
    };
}

export function setSite (site, siteIndex) {
    return {
        type: constants.SET_SITE,
        site: site,
        siteIndex: siteIndex
    };
}


export function nextPage () {
    return { type: constants.SET_NEXT_PAGE };
}

export function previousPage () {
    return { type: constants.SET_PREVIOUS_PAGE };
}

export function refreshList () {
    return { type: constants.SET_REFRESH_LIST };
}
