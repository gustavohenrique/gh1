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
        }
    }

    switch (action.type) {
        case 'REQUEST_START':
            let isWaiting = action.hasOwnProperty('isWaitingRequest') ? action.isWaitingRequest : false;
            return {
                ...state,
                isWaitingRequest: isWaiting,
                isFetching: true
            }

        case 'FILTER_SITES_SUCCESS':
            return {
                ...markAsFinishedRequest(state),
                sites: action.sites,
                site: null,
                pagination: Object.assign({}, state.pagination, action.pagination)
            }

        case 'SET_PREVIOUS_PAGE':
            const previousPage = state.pagination.previous;
            return {
                ...state,
                pagination: Object.assign({}, state.pagination, { page: previousPage })
            }

        case 'SET_NEXT_PAGE':
            const nextPage = state.pagination.next;
            return {
                ...state,
                pagination: Object.assign({}, state.pagination, { page: nextPage })
            }

        case 'SET_REFRESH_LIST':
            return {
                ...state,
                pagination: Object.assign({}, state.pagination, { page: 1 })
            }

        case 'SET_SITE':
            return {
                ...state,
                site: action.site,
                siteIndex: action.siteIndex
            }

        case 'SITE_ADDED':
            return {
                ...markAsFinishedRequest(state),
                site: action.site
            }

        case 'TAG_ADDED':
        case 'TAG_REMOVED':
            let sites = state.sites.slice(0)
            sites[action.siteIndex] = action.site
            return {
                ...markAsFinishedRequest(state),
                sites: sites
            }
        
        default:
            return state
    }
}
