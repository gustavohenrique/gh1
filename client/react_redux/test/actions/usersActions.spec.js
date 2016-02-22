import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';
import { createStore, applyMiddleware, compose } from 'redux';
import { mainReducer } from '../../app/scripts/reducers';
import { getEndpoints } from '../../app/scripts/util';
import * as actions from '../../app/scripts/actions/usersActions';
import * as types from '../../app/scripts/constants';

const finalCreateStore = compose(applyMiddleware(thunk))(createStore);

describe('usersActions', () => {

    const BASE_API_URL = getEndpoints().BASE_API_URL;
    let store;

    beforeEach(() => {
        store = finalCreateStore(mainReducer);
        store.dispatch({
            type: types.SET_ENDPOINTS,
            endpoints: getEndpoints()
        });
    });

    afterEach(() => {
        nock.cleanAll();
    });


    describe('#authenticate', () => {
        it('Successfuly authentication using email and password', (done) => {
            const url = BASE_API_URL;
            const fake = { id: 1, email: 'me@company.com', password: 'XptRxir', token: 'dR4kw' };
            nock(url)
                .post('/users/authenticate', {
                    email: fake.email,
                    password: fake.password
                }).reply(200, { user: fake });

            store.dispatch(actions.authenticate(fake.email, fake.password));
            store.subscribe(() => {
                const state = store.getState();
                expect(state.user.id).to.equal(fake.id);
                expect(state.user.isAuthenticated).to.be.true;
                expect(state.redirectAfterLogin).to.be.true;
                expect(state.isFetching).to.be.false;
                expect(state.isWaitingRequest).to.be.false;
                done();
            });
        });

        it('Authentication should fail if password is not specified', (done) => {
            const url = BASE_API_URL;
            nock(url)
                .post('/users/authenticate').reply(403, {});

            store.dispatch(actions.authenticate('me@company.com'));
            store.subscribe(() => {
                const state = store.getState();
                expect(state.user.id).to.be.undefined;
                expect(state.isFetching).to.be.false;
                expect(state.isWaitingRequest).to.be.false;
                done();
            });
        });
    });

});