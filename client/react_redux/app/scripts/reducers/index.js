import * as constants from '../constants';

const initialState = {
    isFetching: false,
    isWaitingRequest: false,
    sites: [],
    user: {},
    redirectAfterLogin: false,
    endpoints: null,
    pagination: {
        page: 1,
        perPage: 12,
        current: 0,
        next: 1,
        previous: 0
    }
};

export function mainReducer (state = initialState, action) {
    
    const markAsFinishedRequest = (state) => {
        return {
            ...state,
            isFetching: false,
            isWaitingRequest: false
        };
    };

    switch (action.type) {
        case constants.SET_ENDPOINTS:
            return {
                ...state,
                endpoints: action.endpoints
            };

        case constants.REQUEST_START:
            let isWaiting = action.hasOwnProperty('isWaitingRequest') ? action.isWaitingRequest : false;
            return {
                ...state,
                isWaitingRequest: isWaiting,
                isFetching: true
            };

        case constants.FILTER_SITES_SUCCESS:
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

        case constants.SET_PREVIOUS_PAGE:
            const previousPage = state.pagination.previous;
            return {
                ...state,
                pagination: Object.assign({}, state.pagination, { page: previousPage })
            };

        case constants.SET_NEXT_PAGE:
            const nextPage = state.pagination.next;
            return {
                ...state,
                pagination: Object.assign({}, state.pagination, { page: nextPage })
            };

        case constants.SET_REFRESH_LIST:
            return {
                ...state,
                pagination: Object.assign({}, state.pagination, { page: 1 })
            };

        case constants.SET_SITE:
            return {
                ...state,
                site: action.site,
                siteIndex: action.siteIndex
            };

        case constants.SITE_ADDED:
            return {
                ...markAsFinishedRequest(state),
                site: action.response.data.site
            };

        case constants.TAG_ADDED:
        case constants.TAG_REMOVED:
            let sites = state.sites.slice(0); // returns new array
            sites[action.siteIndex] = action.response.data.site;
            return {
                ...markAsFinishedRequest(state),
                sites: sites
            };

        case constants.AUTHENTICATED:
            let user = action.response.data.user;
            user.isAuthenticated = true;
            return {
                ...markAsFinishedRequest(state),
                user: user,
                redirectAfterLogin: true
            };

        case constants.NOT_AUTHENTICATED:
            return {
                ...markAsFinishedRequest(state),
                errors: action.response.data
            };

        case constants.TURN_OFF_REDIRECT:
            return {
                ...markAsFinishedRequest(state),
                redirectAfterLogin: false
            };
        
        default:
            return state;
    }
}
