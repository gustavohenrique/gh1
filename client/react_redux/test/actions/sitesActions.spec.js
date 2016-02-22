import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';
import { mainReducer } from '../../app/scripts/reducers';
import { getEndpoints } from '../../app/scripts/util';
import { createStore, applyMiddleware, compose } from 'redux';
import * as actions from '../../app/scripts/actions/sitesActions';
import * as constants from '../../app/scripts/constants';

const finalCreateStore = compose(applyMiddleware(thunk))(createStore);

describe('sitesActions', () => {

    const BASE_API_URL = getEndpoints().BASE_API_URL;
    let store;

    beforeEach(() => {
        store = finalCreateStore(mainReducer);
        store.dispatch({
            type: constants.SET_ENDPOINTS,
            endpoints: getEndpoints()
        });
    });

    afterEach(() => {
        nock.cleanAll();
    });

    describe('#setSite', () => {
        it('Returns an action contains site and siteIndex', () => {
            const siteIndex = 0;
            const site = { id: 1 };
            const expected = {
                type: constants.SET_SITE,
                siteIndex,
                site
            }
            const action = actions.setSite(site, siteIndex);

            expect(action).to.not.equal(expected);
            expect(action.siteIndex).to.equal(expected.siteIndex);
            expect(action.site.id).to.equal(expected.site.id);
        });
    });

    describe('#addSite', () => {
        it('Adds a site with long url and no user', (done) => {
            const response = { site: { longUrl: 'http://google.com', userId: undefined } };
            nock(BASE_API_URL).post('/sites').reply(201, response)

            store.dispatch(actions.addSite('http://google.com'));
            store.subscribe(() => {
                const state = store.getState();
                expect(state.user.isAuthenticated).to.be.undefined;
                expect(state.site.longUrl).to.equal(response.site.longUrl);
                expect(state.isFetching).to.be.false;
                expect(state.isWaitingRequest).to.be.false;
                done();
            });
        });

        it('Adds a site with long url and user id', (done) => {
            const response = { site: { longUrl: 'http://google.com', userId: 10 } };
            nock(BASE_API_URL).post('/sites').reply(201, response)

            store.dispatch(actions.addSite('http://google.com'));
            store.subscribe(() => {
                const state = store.getState();
                expect(state.user.isAuthenticated).to.be.undefined;
                expect(state.site.longUrl).to.equal(response.site.longUrl);
                expect(state.site.userId).to.equal(response.site.userId);
                expect(state.isFetching).to.be.false;
                expect(state.isWaitingRequest).to.be.false;
                done();
            });
        });
    });

});