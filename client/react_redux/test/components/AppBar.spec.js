import React from 'react';
import { expect } from 'chai';
import { render } from 'enzyme';
import AppBar from '../../app/scripts/components/main/AppBar.jsx';

describe('<AppBar />', () => {

    it('Sets active class when the url path is "new"', (done) => {
        const wrapper = render(<AppBar path='new' />);
        const expected = '<li class="active"><a class="">New</a></li><li class=""><a class="">List</a></li>';
        expect(wrapper.find('ul.nav.navbar-nav').html()).to.equal(expected);
        done();
    });

    it('Sets active class when the url path is "list"', (done) => {
        const wrapper = render(<AppBar path='list' />);
        const expected = '<li class=""><a class="">New</a></li><li class="active"><a class="">List</a></li>';
        expect(wrapper.find('ul.nav.navbar-nav').html()).to.equal(expected);
        done();
    });
});