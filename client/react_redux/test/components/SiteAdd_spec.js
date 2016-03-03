import React from 'react';
import ReactDOM from 'react-dom';
import { SiteAdd } from '../../app/scripts/components/site/SiteAdd.jsx';
import { expect } from 'chai';
import sinon from 'sinon';
import {
    renderIntoDocument,
    findRenderedDOMComponentWithClass,
    scryRenderedDOMComponentsWithTag,
    scryRenderedDOMComponentsWithClass,
    Simulate
} from 'react-addons-test-utils';

describe('<SiteAdd/>', () => {

    it('renders an input and button when site is not defined', () => {
        const component = renderIntoDocument(
            <SiteAdd user={null} site={null} />
        );
        const input = scryRenderedDOMComponentsWithClass(component, 'long-url');
        const button = scryRenderedDOMComponentsWithClass(component, 'btn-shorten');
        const card = ReactDOM.findDOMNode(component.refs.card);

        expect(input.length).to.equal(1);
        expect(button.length).to.equal(1);
        expect(card).to.be.not.ok;
    });

    it('renders an input, a button and the card when site has shortUrl', () => {
        const component = renderIntoDocument(
            <SiteAdd user={null} site={{shortUrl: 'http://gh1.co/xpto'}} />
        );
        const input = scryRenderedDOMComponentsWithClass(component, 'long-url');
        const button = scryRenderedDOMComponentsWithClass(component, 'btn-shorten');
        const card = ReactDOM.findDOMNode(component.refs.card);

        expect(input.length).to.equal(1);
        expect(button.length).to.equal(1);
        expect(card).to.be.ok;
    });

    it('invokes callback when a button is clicked', () => {
        const addSite = sinon.spy();
        const component = renderIntoDocument(
            <SiteAdd user={null} site={null} addSite={addSite} />
        );
        component.refs.longUrl.value = 'http://google.com';
        const button = scryRenderedDOMComponentsWithTag(component, 'button');
        Simulate.click(button[0]);

        expect(addSite.calledOnce).to.equal(true);
    });

    it('error is not displayed when the state has no error', () => {
        const component = renderIntoDocument(
            <SiteAdd user={null} site={null} addSite={null} />
        );
        component.setState({'longUrlIsValid': true});
        const spans = scryRenderedDOMComponentsWithTag(component, 'span');
        expect(spans).to.have.length(2);
    });

    it('error is displayed when the state has error', () => {
        const component = renderIntoDocument(
            <SiteAdd user={null} site={{longUrl: 'xxxx'}} addSite={null} />
        );
        component.setState({'longUrlIsValid': false});
        const spans = scryRenderedDOMComponentsWithTag(component, 'span');
        expect(spans).to.have.length(1);
    });

});