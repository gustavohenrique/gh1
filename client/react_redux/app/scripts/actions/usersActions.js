import { UserApi } from '../api';
import * as constants from '../constants';
import { showLoadingBar } from './';

export function authenticate (email, password) {
    return (dispatch, getState) => {
        dispatch(showLoadingBar());

        new UserApi(getState().endpoints).authenticate(email, password)
        .then((response) => {
            dispatch({
                type: constants.AUTHENTICATED,
                response: response
            });
        })
        .catch((err) => {
            dispatch({
                type: constants.NOT_AUTHENTICATED,
                response: err
            });
        });
    };
}

export function dontRedirectAgainWhileIsAutenticated () {
    return {
        type: constants.TURN_OFF_REDIRECT
    };
}
