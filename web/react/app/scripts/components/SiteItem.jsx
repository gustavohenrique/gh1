import QRCode from 'qrcode.react'
import TagContainer from './TagContainer.jsx'
import { convertDate } from '../util'

export default class SiteItem extends React.Component {

    render () {
        function getShortenUrl (code) {
            return 'http://gh1.co/' + code;
        }

        const { site, siteIndex } = this.props

        return (
            <div className="col-sm-4">
                <div className="card well">
                    <div className="card-header">
                        {site.title}
                    </div>
                    <div className="card-content">
                        <div className="card-meta">
                            <span>Last click on {convertDate(site.lastAccess)}</span>
                        </div>
                        <div className="card-tags">
                            <TagContainer site={site} siteIndex={siteIndex} />
                        </div>

                    </div>
                    <div className="card-action">
                        <ul className="tools">
                            <li><span className="glyphicon glyphicon-heart"><span className="tools-item-counter"> 14</span></span></li>
                            <li><span className="glyphicon glyphicon-eye-open"><span className="tools-item-counter"> {site.hits}</span></span></li>
                        </ul>
                    </div>
                    <div className="card-qrcode">
                        <a href={getShortenUrl(site.code)} title="Click to visit">
                            <QRCode value={getShortenUrl(site.code)} size={100} />
                        </a>
                    </div>
                    <div className="card-link alert alert-primary">
                        <a href={getShortenUrl(site.code)} title="Click to visit" className="alert-link">{getShortenUrl(site.code)}</a>
                    </div>
                </div>
            </div>
        )
    }
}
