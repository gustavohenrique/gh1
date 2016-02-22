import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { LoginContainer } from '../../app/scripts/components/users/LoginContainer.jsx';

describe('<LoginContainer />', () => {

    it('Call action when the button <Login> is clicked', (done) => {
        const dispatch = sinon.spy();
        const wrapper = shallow(<LoginContainer dispatch={dispatch} />);
        const btnAuthenticate = wrapper.find('#btnAuthenticate');
        expect(btnAuthenticate).to.have.length(1);
        btnAuthenticate.first().simulate('click');
        expect(dispatch.calledOnce).to.equal(true);
        done();
    });

    it('Should show only the login form', (done) => {
        const wrapper = shallow(<LoginContainer dispatch={sinon.spy()} />);
        const divLogin = wrapper.find('.login');
        const divLogged = wrapper.find('.logged');
        const divError = wrapper.find('.alert-danger');
        expect(divLogin).to.have.length(1);
        expect(divLogged).to.have.length(0);
        expect(divError).to.have.length(0);
        done();
    });

    it('should show the error form', (done) => {
        const wrapper = shallow(<LoginContainer dispatch={sinon.spy()} errors={{code: 403}} />);
        const divLogin = wrapper.find('.login');
        const divLogged = wrapper.find('.logged');
        const divError = wrapper.find('.alert-danger');
        expect(divLogin).to.have.length(1);
        expect(divLogged).to.have.length(0);
        expect(divError).to.have.length(1);
        done();
    });
});