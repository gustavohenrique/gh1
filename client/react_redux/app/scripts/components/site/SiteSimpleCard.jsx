import React, { PropTypes } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

export default class SiteSimpleCard extends React.Component {

    render () {
        const { site } = this.props;

        return (
            <div className="">
                <div className="ui success message">
                    <div className="header">
                        <a href={site.shortUrl} title={site.longUrl} target="_blank">
                            <h2>{site.shortUrl}</h2>
                        </a>
                    </div>
                    <p className="social icons">
                        <CopyToClipboard text={site.shortUrl}>
                            <a title="Copy it"><i className="copy icon"/></a>
                        </CopyToClipboard>
                    </p>
                    <p>{site.longUrl}</p>
                </div>
            </div>
        );
    }
}

SiteSimpleCard.propTypes = {
    site: PropTypes.object.isRequired
};