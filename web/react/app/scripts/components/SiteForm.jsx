import React from 'react';
import { connect } from 'react-redux';
import QRCode from 'qrcode.react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { addSite, setSite } from '../actions';
import { BASE_SHORTEN_URL } from '../constants';

class SiteForm extends React.Component {

    constructor (props) {
        super(props);
        this.state = { inputValue: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
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

    handleKeyPress (e) {
        if (e.key === 'Enter') {
            this.handleClick();
        }
    }

    render () {
        function getShortenUrl (code) {
            return BASE_SHORTEN_URL + code;
        }

        const { site } = this.props;

        let infoComponent = (<div className="site-info" />);
        if (site) {
            const url = getShortenUrl(site.code);
            infoComponent = (
                <div className="well site-info">
                    <div>
                        <QRCode value={url} size={100} />
                    </div>
                    <div>
                        <input type="text" value={url} className="form-control input-link" readOnly="true" />
                        <CopyToClipboard text={url} onCopy={this.props.clearSite}>
                            <button className="btn btn-raised btn-default" type="button">Copy to clipboard</button>
                        </CopyToClipboard>
                    </div>
                </div>
            );
        }

        return (
            <div className="tab-pane active in">
                <div className="well">
                    <input value={this.state.inputValue} onChange={this.handleChange} onKeyPress={this.handleKeyPress} type="text" className="form-control" placeholder="URL for..." />
                    <span className="input-group-btn">
                        <button onClick={this.handleClick} className="btn btn-raised btn-primary" type="button">Shorten</button>
                    </span>
                </div>
                {infoComponent}
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        site: state.site
    };
}

function mapDispatchToProps (dispatch) {
    return {
        addSite: function (url) {
            dispatch(addSite(url));
        },
        
        clearSite: function () {
            dispatch(setSite(null, null));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SiteForm);
