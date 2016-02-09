import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { expect } from 'chai';
import { shallow, render } from 'enzyme';
import AppBar from '../../app/scripts/components/AppBar.jsx';

const mockStore = configureStore([ thunk ]);
chai.use(chaiEnzyme());

describe('<AppBar />', () => {

    it('sets active class when the url path is "new"', (done) => {
        const state = { isFetching: true };
        const store = mockStore(state, [], done);
        const wrapper = render(<AppBar store={store} path='new' />);
        const expected = '<li class="active"><a class="">New</a></li><li class=""><a class="">List</a></li>';
        expect(wrapper.find('ul.nav.navbar-nav').html()).to.equal(expected);
        done();
    });

    it('sets active class when the url path is "list"', (done) => {
        const state = { isFetching: true };
        const store = mockStore(state, [], done);
        const wrapper = render(<AppBar store={store} path='list' />);
        const expected = '<li class=""><a class="">New</a></li><li class="active"><a class="">List</a></li>';
        expect(wrapper.find('ul.nav.navbar-nav').html()).to.equal(expected);
        done();
    });


});