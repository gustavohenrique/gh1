import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import QRCode from 'qrcode.react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { addSite, setSite } from '../../actions/sitesActions';

export class SiteForm extends React.Component {

    constructor (props) {
        super(props);
        this.state = { longUrl: '', hasError: false };
        this.handleOnChangeSetUrl = this.handleOnChangeSetUrl.bind(this);
        this.handleOnClickAddSite = this.handleOnClickAddSite.bind(this);
        this.handleOnKeyDownAddSite = this.handleOnKeyDownAddSite.bind(this);
        this.handleOnClickUnselectSite = this.handleOnClickUnselectSite.bind(this);
    }

    componentWillMount () {
        this.handleOnClickUnselectSite();
    }

    handleOnClickUnselectSite () {
        this.props.dispatch(setSite(null, null));
    }

    componentWillReceiveProps () {
        this.setState({ longUrl: '', hasError: false });
    }

    handleOnChangeSetUrl (e) {
        this.setState({ longUrl: e.target.value });
    }

    handleOnClickAddSite () {
        const url = this.state.longUrl || '';
        let hasError = true;
        try {
            new URL(url);
            hasError = false;
        } catch (e) {}

        if (! hasError && url.length > 0) {
            this.props.dispatch(addSite(url.trim(), this.props.user.id));
        }
        this.setState({ hasError: hasError });
    }

    handleOnKeyDownAddSite (e) {
        if (e.key === 'Enter') {
            this.handleOnClickAddSite();
        }
    }

    render () {
        const { site, endpoints } = this.props;
        const { hasError } = this.state;
        const getShortUrl = (code) => endpoints.SHORT_URL + code;

        let QRCodeAndShortUrlComponent = (<div className="site-info" />);

        if (site && site.code) {
            const url = getShortUrl(site.code);
            QRCodeAndShortUrlComponent = (
                <div className="well site-info form-group">
                    <div>
                        <QRCode value={url} size={100} />
                    </div>
                    <div>
                        <input type="text" value={url} className="form-control" readOnly="true" />
                        <CopyToClipboard text={url} onCopy={this.handleOnClickUnselectSite}>
                            <button className="btn btn-raised btn-default" type="button">Copy to clipboard</button>
                        </CopyToClipboard>
                    </div>
                </div>
            );
        }

        return (
            <div className="tab-pane active in">
                <div className={hasError ? "well form-group has-error" : "well form-group"} style={{margin: "0"}}>
                    <input value={this.state.longUrl} onChange={this.handleOnChangeSetUrl} onKeyDown={this.handleOnKeyDownAddSite} type="text" className="form-control" placeholder="URL for..." />
                    <div style={hasError ? {fontSize: "12px", color: "red", marginBottom: "10px"} : {display: "none"}}>Please enter a valid URL address</div>
                    <span className="input-group-btn">
                        <button onClick={this.handleOnClickAddSite} className="btn btn-raised btn-primary" type="button">Shorten</button>
                    </span>
                </div>
                {QRCodeAndShortUrlComponent}
            </div>
        );
    }
}

SiteForm.propTypes = {
    user: PropTypes.object.isRequired,
    endpoints: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        site: state.site,
        user: state.user,
        endpoints: state.endpoints
    };
};

export default connect(mapStateToProps)(SiteForm);
