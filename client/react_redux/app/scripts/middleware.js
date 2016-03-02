export default store => next => action => {
    if (typeof action === 'function') {
        action(store.dispatch, store.getState);
    }
    else {
        const loading = (action.meta && action.meta.remote);
        action.loading = loading;
        return next(action);
    }
}