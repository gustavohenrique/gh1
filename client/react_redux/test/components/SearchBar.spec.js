import React from 'react';
import ReactDOM from 'react-dom';
import { SearchBar } from '../../app/scripts/components/tag/SearchBar.jsx';
import { expect } from 'chai';
import sinon from 'sinon';
import {
    renderIntoDocument,
    scryRenderedDOMComponentsWithTag,
    Simulate
} from 'react-addons-test-utils';

describe('<SiteAdd/>', () => {

    it('renders an input', () => {
        const component = renderIntoDocument(
            <SearchBar user={null} />
        );
        const input = scryRenderedDOMComponentsWithTag(component, 'input');
        expect(input.length).to.equal(1);
    });

    it('renders an input, a button and the card when site has shortUrl', () => {
        const component = renderIntoDocument(
            <SiteAdd user={null} site={{shortUrl: 'http://gh1.co/xpto'}} />
        );
        const input = scryRenderedDOMComponentsWithTag(component, 'input');
        const button = scryRenderedDOMComponentsWithTag(component, 'button');
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
        const message = ReactDOM.findDOMNode(component.refs.message);
        expect(message).to.be.not.ok;
    });

    it('error is displayed when the state has error', () => {
        const component = renderIntoDocument(
            <SiteAdd user={null} site={{longUrl: 'xxxx'}} addSite={null} />
        );
        component.setState({'longUrlIsValid': false});
        // const spans = scryRenderedDOMComponentsWithTag(component, 'span');
        const message = ReactDOM.findDOMNode(component.refs.message);
        expect(message).to.be.ok;
    });

});