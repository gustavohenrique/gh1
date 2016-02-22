import React from 'react';
import { expect } from 'chai';
import { render } from 'enzyme';
import { SiteForm } from '../../app/scripts/components/sites/SiteForm.jsx';
import { getEndpoints } from '../../app/scripts/util';

describe('<SiteForm />', () => {

    it('Should show the qrcode after adds a site', (done) => {
        const wrapper = render(<SiteForm site={{code: 'x744cs'}} user={{}} endpoints={getEndpoints()} dispatch={() => {}} />);
        const component = wrapper.find('.site-info');
        expect(component.find('canvas')).to.have.length(1);
        done();
    });

    it('Should does not show the qrcode before adds a site', (done) => {
        const wrapper = render(<SiteForm site={{}} user={{}} dispatch={() => {}} />);
        expect(wrapper.find('.site-info').html()).to.equal('');
        done();
    });

});