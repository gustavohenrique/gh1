import { connect } from 'react-redux'
import QRCode from 'qrcode.react'
import CopyToClipboard from 'react-copy-to-clipboard'

import { addSite, setSite } from '../actions'

class SiteForm extends React.Component {

    constructor (props) {
        super(props);
        this.state = { inputValue: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillReceiveProps () {
        this.setState({ inputValue: '' });
    }

    handleChange (e) {
        this.setState({ inputValue: e.target.value });
    }

    handleClick () {
        this.props.addSite(this.state.inputValue);
    }

    render () {
        function getShortenUrl (code) {
            return 'http://gh1.co/' + code;
        }

        const { site } = this.props

        let infoComponent = (<div/>)
        if (site) {
            const url = getShortenUrl(site.code)
            infoComponent = (
                <div className="well">
                    <div>
                        <QRCode value={url} size={100} />
                    </div>
                    <div>
                        <input type="text" value={url} className="form-control input-link" readOnly="true" />
                        <CopyToClipboard text={url} onCopy={this.props.hideInfoComponent}>
                            <button className="btn btn-raised btn-default" type="button">Copy to clipboard</button>
                        </CopyToClipboard>
                    </div>
                </div>
            )
        }

        return (
            <div className="tab-pane active in">
                <div className="well">
                    <input value={this.state.inputValue} onChange={this.handleChange} type="text" className="form-control" placeholder="URL for..." />
                    <span className="input-group-btn">
                        <button onClick={this.handleClick} className="btn btn-raised btn-primary" type="button">Shorten</button>
                    </span>
                </div>
                {infoComponent}
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        site: state.site
    }
}

function mapDispatchToProps (dispatch) {
    return {
        addSite: function (url) {
            dispatch(addSite(url))
        },
        
        hideInfoComponent: function () {
            dispatch(setSite(null, null));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SiteForm)
