import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { expect } from 'chai';
import { shallow, render } from 'enzyme';
import SiteForm from '../../app/scripts/components/SiteForm.jsx';

const mockStore = configureStore([ thunk ]);
chai.use(chaiEnzyme());

describe('<SiteForm />', () => {

    it('should show the qrcode after add a site', (done) => {
        const state = { site: {
            code: 123
        } };
        const store = mockStore(state, [], done);
        const wrapper = render(<SiteForm store={store} />);
        const component = wrapper.find('.site-info');
        expect(component.find('canvas')).to.have.length(1);
        done();
    });

    it('should not show the qrcode before add a site', (done) => {
        const state = { site: null };
        const store = mockStore(state, [], done);
        const wrapper = render(<SiteForm store={store} />);
        expect(wrapper.find('.site-info').html()).to.equal('');
        done();
    });

});