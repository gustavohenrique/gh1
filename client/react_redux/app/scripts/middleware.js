export default store => next => action => {
    if (typeof action === 'function') {
        action(store.dispatch, store.getState);
    }
    else {
        const loading = (action.hasOwnProperty('meta') && action.meta.hasOwnProperty('remote'));
        action.loading = loading;
        return next(action);
    }
}