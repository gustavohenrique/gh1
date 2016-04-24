import React, { PropTypes } from 'react';
import QRCode from 'qrcode.react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { convertToDate } from '../../util';
import { TagContainer } from '../tag/TagContainer.jsx';
import SiteTitle from './SiteTitle.jsx';
import Twitter from '../Twitter.jsx';

export default class SiteCard extends React.Component {

    render () {
        const { user, site, siteIndex } = this.props;

        return (
            <div className="card" style={{height: "325px"}}>
                <div className="content">
                    <div className="header">
                        <SiteTitle key={site.id} user={user} site={site} siteIndex={siteIndex} />
                    </div>
                    <div className="meta">
                        <span className="right floated time">{site.hits} Hits</span>
                        <span className="date">Last click on {convertToDate(site.lastAccessAt)}</span>
                    </div>
                    <div className="description">
                        <TagContainer ref="tags" user={user} site={site} siteIndex={siteIndex} />
                    </div>
                    <div className="extra content">
                        <CopyToClipboard text={site.longUrl}>
                            <div style={{marginTop: "15px", textAlign: "center"}}>
                                <QRCode value={site.shortUrl} size={80} />
                            </div>
                        </CopyToClipboard>
                        
                        <div className="ui success message" style={{height: "50px"}}>
                            <div className="header" style={{textAlign: "center"}}>
                                <a style={{float: "left"}} href={site.shortUrl} title={site.longUrl} target="_blank">
                                    <h4>{site.shortUrl}</h4>
                                </a>
                                <div style={{float: "right", fontSize: "1.2rem"}}>
                                    <CopyToClipboard text={site.shortUrl}>
                                        <a title="Copy it"><i className="copy icon"/></a>
                                    </CopyToClipboard>
                                    <Twitter text={site.title} tags={site.tags} />
                                </div>
                            </div>
                        </div>
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