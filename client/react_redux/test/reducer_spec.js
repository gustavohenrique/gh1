import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../app/scripts/reducer';
import * as types from '../app/scripts/types';

describe('reducer', () => {

    it('LOADING', () => {
        const action = {
            type: types.LOADING
        };
        const nextState = reducer(reducer.INITIAL_STATE, action);
        expect(nextState.get('loading')).to.be.true;
    });

    it('ADD_SITE_SUCCESS', () => {
        const action = {
            type: types.ADD_SITE_SUCCESS,
            site: {
                id: 1,
                code: 'xpto'
            }
        };
        const nextState = reducer(reducer.INITIAL_STATE, action);
        expect(nextState.get('site')).to.equal(fromJS(action.site));
    });

    it('ADD_SITE_FAIL', () => {
        const action = {
            type: types.ADD_SITE_FAIL,
            error: {
                message: 'Bad Request',
                status: 400
            }
        };
        const nextState = reducer(reducer.INITIAL_STATE, action);
        expect(nextState.get('siteError')).to.equal(fromJS(action.error));
    });

});