import React, { PropTypes } from 'react';
import QRCode from 'qrcode.react';
import { convertToDate } from '../../util';
import { TagContainer } from '../tag/TagContainer.jsx';

export default class SiteCard extends React.Component {

    render () {
        const { user, site, siteIndex } = this.props;

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
                            <TagContainer ref="tags" user={user} site={site} siteIndex={siteIndex} />
                        </div>

                    </div>
                    <div className="card-action">
                        <ul className="tools">
                            <li><span className="glyphicon glyphicon-eye-open"><span className="tools-item-counter"> {site.hits}</span></span></li>
                        </ul>
                    </div>
                    <div className="card-qrcode">
                        <a href={site.shortUrl} title={site.longUrl}>
                            <QRCode value={site.shortUrl} size={100} />
                        </a>
                    </div>
                    <div className="card-link alert alert-primary">
                        <a href={site.shortUrl} title={site.longUrl} target="_blank" className="alert-link">{site.shortUrl}</a>
                    </div>
                </div>
            </div>
        );
    }
}

SiteCard.propTypes = {
    user: PropTypes.object,
    site: PropTypes.object.isRequired,
    siteIndex: PropTypes.number.isRequired
};