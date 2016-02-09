import * as types from '../constants';

const initialState = {
    isFetching: false,
    isWaitingRequest: false,
    sites: [],
    pagination: {
        page: 1,
        perPage: 12,
        current: 0,
        next: 1,
        previous: 0
    }
};

export function paginate (state = initialState, action) {
    
    function markAsFinishedRequest (state) {
        return {
            ...state,
            isFetching: false,
            isWaitingRequest: false
        };
    }

    switch (action.type) {
        case types.REQUEST_START:
            let isWaiting = action.hasOwnProperty('isWaitingRequest') ? action.isWaitingRequest : false;
            return {
                ...state,
                isWaitingRequest: isWaiting,
                isFetching: true
            };

        case types.FILTER_SITES_SUCCESS:
            return {
                ...markAsFinishedRequest(state),
                sites: action.sites,
                site: null,
                pagination: Object.assign({}, state.pagination, action.pagination)
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

        case types.SITE_ADDED:
            return {
                ...markAsFinishedRequest(state),
                site: action.site
            };

        case types.TAG_ADDED:
        case types.TAG_REMOVED:
            let sites = state.sites.slice(0);
            sites[action.siteIndex] = action.site;
            return {
                ...markAsFinishedRequest(state),
                sites: sites
            };
        
        default:
            return state;
    }
}
