import { expect } from 'chai';
import thunk from 'redux-thunk';
import nock from 'nock';
import { createStore, applyMiddleware, compose } from 'redux';
import * as actions from '../../app/scripts/actions';
import { paginate } from '../../app/scripts/reducers';
import * as types from '../../app/scripts/constants'


const finalCreateStore = compose(
    applyMiddleware(thunk)
)(createStore);
const store = finalCreateStore(paginate);



describe('actions', () => {

    afterEach(() => {
        nock.cleanAll()
    });

    it('should create an action to set a site', () => {
        const siteIndex = 0;
        const site = { id: 1 };
        const expected = {
            type: types.SET_SITE,
            siteIndex,
            site
        }
        const action = actions.setSite(site, siteIndex);

        expect(action).to.not.equal(expected);
        expect(action.siteIndex).to.equal(expected.siteIndex);
        expect(action.site.id).to.equal(expected.site.id);
    });

    it('creates site and returns the site', (done) => {
        const url = 'https://gh1.herokuapp.com';
        const mock = { id: 1 };
        nock(url).post('/shortener').reply(200, mock)

        store.dispatch(actions.addSite(url));
        store.subscribe(() => {
            let state = store.getState();
            expect(state.site.id).to.equal(mock.id);
            expect(state.isFetching).to.be.false;
            expect(state.isWaitingRequest).to.be.false;
            done();
        });
    });

});