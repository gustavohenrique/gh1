import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { expect } from 'chai';
import { shallow, render } from 'enzyme';
import sinon from 'sinon';
import Pagination, { Pagination as PaginationClass } from '../../app/scripts/components/Pagination.jsx';

const mockStore = configureStore([ thunk ]);
chai.use(chaiEnzyme());

describe('<Pagination />', () => {

    let state;

    beforeEach(() => {
        state = { pagination: {
            current: 1
        } };
    });

    it('show the current page', (done) => {
        const store = mockStore(state, [], done);
        const wrapper = render(<Pagination store={store} />);
        expect(wrapper.find('a.current').text()).to.equal('1');
        done();
    });

    it('call action when the button <previous> is clicked', (done) => {
        const onButtonClick = sinon.spy();
        const store = mockStore(state, [], done);
        const wrapper = shallow(<PaginationClass store={store} currentPage={1} previousPage={onButtonClick} nextPage={onButtonClick} refreshList={onButtonClick} />);
        wrapper.find('a.previous').first().simulate('click');
        expect(onButtonClick.calledOnce).to.equal(true);
        done();
    });

    it('call action when the button <next> is clicked', (done) => {
        const onButtonClick = sinon.spy();
        const store = mockStore(state, [], done);
        const wrapper = shallow(<PaginationClass store={store} currentPage={1} previousPage={onButtonClick} nextPage={onButtonClick} refreshList={onButtonClick} />);
        wrapper.find('a.next').first().simulate('click');
        expect(onButtonClick.calledOnce).to.equal(true);
        done();
    });

    it('call action when the button <refresh> is clicked', (done) => {
        const onButtonClick = sinon.spy();
        const store = mockStore(state, [], done);
        const wrapper = shallow(<PaginationClass store={store} currentPage={1} previousPage={onButtonClick} nextPage={onButtonClick} refreshList={onButtonClick} />);
        wrapper.find('a.refresh').first().simulate('click');
        expect(onButtonClick.calledOnce).to.equal(true);
        done();
    });

});