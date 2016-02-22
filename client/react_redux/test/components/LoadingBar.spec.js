import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { expect } from 'chai';
import { render } from 'enzyme';
import LoadingBar from '../../app/scripts/components/main/LoadingBar.jsx';

const mockStore = configureStore([ thunk ]);

describe('<LoadingBar />', () => {

    it('Sets width to 100% if there is a request in progress', (done) => {
        const state = { isFetching: true };
        const store = mockStore(state, [], done);
        const wrapper = render(<LoadingBar store={store} />);
        expect(wrapper.find('#progressBar').attr('style')).to.equal('width:100%;');
        done();
    });

    it('Sets width to 0% if there is not a request in progress', (done) => {
        const state = { isFetching: false };
        const store = mockStore(state, [], done);
        const wrapper = render(<LoadingBar store={store} />);
        expect(wrapper.find('#progressBar').attr('style')).to.equal('width:0%;');
        done();
    });

});