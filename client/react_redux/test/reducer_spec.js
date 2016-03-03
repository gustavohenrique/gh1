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

    it('ADD_SITE_FAIL should reset errors', () => {
        const initialState = fromJS({
            errors: ['addTag']
        });
        const action = {
            type: types.ADD_SITE_FAIL
        };
        const nextState = reducer(initialState, action);
        expect(nextState.get('errors')).to.equal(List.of(types.ADD_SITE_FAIL));
    });

    it('RESET_ERROR', () => {
        const initialState = fromJS({
            errors: ['addTag', types.ADD_SITE_FAIL, 'listSite']
        });
        const action = {
            type: types.RESET_ERROR,
            error: types.ADD_SITE_FAIL
        };
        const nextState = reducer(initialState, action);
        expect(nextState.get('errors')).to.equal(List.of('addTag', 'listSite'));
    });

    it('immutable', () => {
        const initialState = fromJS({
            'errors': ['a', 'b', 'c']
        });
        
        expect(initialState.get('errors').contains('b')).to.be.true;
    });

});