import React, { PropTypes } from 'react';
import QRCode from 'qrcode.react';
import CopyToClipboard from 'react-copy-to-clipboard';

export default class SiteSimpleCard extends React.Component {

    render () {
        const {site} = this.props;

        return (
            <div className="well site-info form-group">
                <div>
                    <QRCode value={site.shortUrl} size={100} />
                </div>
                <div>
                    <input type="text" value={site.shortUrl} className="form-control" readOnly="true" />
                    <CopyToClipboard text={site.shortUrl}>
                        <button className="btn btn-raised btn-default" type="button">Copy to clipboard</button>
                    </CopyToClipboard>
                </div>
            </div>
        );
    }
}

SiteSimpleCard.propTypes = {
    site: PropTypes.object.isRequired
};