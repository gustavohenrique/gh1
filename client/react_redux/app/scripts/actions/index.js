import * as constants from '../constants';

export function showLoadingBar () {
    return { type: constants.REQUEST_START };
}