import React, { PropTypes } from 'react';
import QRCode from 'qrcode.react';
import TagContainer from './tags/TagContainer.jsx';
import { convertToDate } from '../../util';

export default class SiteItem extends React.Component {

    render () {
        const { user, site, siteIndex, endpoints } = this.props;
        const shortUrl = endpoints.SHORT_URL + site.code;

        return (
            <div className="col-sm-4">
                <div className="card well">
                    <div className="card-header">
                        {site.title}
                    </div>
                    <div className="card-content">
                        <div className="card-meta">
                            <span>Last click on {convertToDate(site.lastAccessAt)}</span>
                        </div>
                        <div className="card-tags">
                            <TagContainer user={user} site={site} siteIndex={siteIndex} />
                        </div>

                    </div>
                    <div className="card-action">
                        <ul className="tools">
                            <li><span className="glyphicon glyphicon-eye-open"><span className="tools-item-counter"> {site.hits}</span></span></li>
                        </ul>
                    </div>
                    <div className="card-qrcode">
                        <a href={shortUrl} title={site.longUrl}>
                            <QRCode value={shortUrl} size={100} />
                        </a>
                    </div>
                    <div className="card-link alert alert-primary">
                        <a href={shortUrl} title={site.longUrl} target="_blank" className="alert-link">{shortUrl}</a>
                    </div>
                </div>
            </div>
        );
    }
}

SiteItem.propTypes = {
    user: PropTypes.object.isRequired,
    site: PropTypes.object.isRequired,
    siteIndex: PropTypes.number.isRequired,
    endpoints: PropTypes.object.isRequired
};