import React, { PropTypes } from 'react';

export default class Twitter extends React.Component {

    render () {
        const { text, url, tags } = this.props;
        let tweet = text ? text.trim() : '';
        tweet += ' ' + url;
        if (tags && tags.length > 0) {
            tweet += ' %23' + tags.join(' %23');
        }

        return (
            <a href={'https://twitter.com/intent/tweet?text=' + tweet} target="_blank">
                <i className="twitter icon"/>
            </a>
        );
    }
}

Twitter.propTypes = {
    text: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    tags: PropTypes.array
};