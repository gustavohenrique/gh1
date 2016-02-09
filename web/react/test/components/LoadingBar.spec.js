import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { expect } from 'chai';
import { shallow, render } from 'enzyme';
import LoadingBar from '../../app/scripts/components/LoadingBar.jsx';

const mockStore = configureStore([ thunk ]);
chai.use(chaiEnzyme());

describe('<LoadingBar />', () => {

    it('set width to 100% if there is a request in progress', (done) => {
        const state = { isFetching: true };
        const store = mockStore(state, [], done);
        const wrapper = render(<LoadingBar store={store} />);
        expect(wrapper.find('#progressBar').attr('style')).to.equal('width:100%;');
        done();
    });

    it('set width to 0% if there is not a request in progress', (done) => {
        const state = { isFetching: false };
        const store = mockStore(state, [], done);
        const wrapper = render(<LoadingBar store={store} />);
        expect(wrapper.find('#progressBar').attr('style')).to.equal('width:0%;');
        done();
    });

});