import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import * as util from '../../util';
import SiteSimpleCard from './SiteSimpleCard.jsx';
import * as actions from '../../actions';


const INITIAL_COMPONENT_STATE = {
    longUrl: '',
    longUrlIsValid: true
};

export class SiteAdd extends React.Component {

    constructor (props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = INITIAL_COMPONENT_STATE;

        this.handleOnChangeSetUrl = this.handleOnChangeSetUrl.bind(this);
        this.handleOnClickAddSite = this.handleOnClickAddSite.bind(this);
        this.handleOnKeyDownAddSite = this.handleOnKeyDownAddSite.bind(this);
    }

    componentWillReceiveProps () {
        this.setState(INITIAL_COMPONENT_STATE);
    }

    handleOnChangeSetUrl (e) {
        this.setState({longUrl: e.target.value});
    }

    handleOnClickAddSite () {
        const longUrl = this.refs.longUrl.value || '';
        const isValid = util.isValidUrl(longUrl);

        if (isValid) {
            this.props.addSite({
                longUrl: longUrl.trim(),
                userId: this.props.user ? this.props.user.id : null
            });
        }
        this.setState({ longUrlIsValid: isValid });
    }

    handleOnKeyDownAddSite (e) {
        if (e.key === 'Enter') {
            this.handleOnClickAddSite();
        }
    }

    render () {
        const {site, error} = this.props;
        const Success = (site && site.shortUrl) ? (<SiteSimpleCard ref="card" site={site} />) : (<div className="site-info" />);
        const Fail = (error && error.message) ? (<div className="alert alert-danger">{error.message}</div>) : (<div />);

        return (
            <div className="tab-pane active in">
                <div className={"well form-group"} style={{margin: "0"}}>
                    <input ref="longUrl" onKeyDown={this.handleOnKeyDownAddSite} type="text" className="form-control long-url" placeholder="URL for..." />
                    <div className="validation-error" style={this.state.longUrlIsValid ? {display: "none"} : {fontSize: "12px", color: "red", marginBottom: "10px"}}>Please enter a valid URL address</div>
                    <span className="input-group-btn">
                        <button onClick={this.handleOnClickAddSite} className="btn btn-shorten btn-raised btn-primary" type="button">Shorten</button>
                    </span>
                </div>
                {Success}
                {Fail}
            </div>
        );
    }
}

SiteAdd.propTypes = {
    user: PropTypes.object,
    site: PropTypes.object,
    error: PropTypes.object
};

const mapStateToProps = (state) => {
    return {
        user: state.get('user').toJS(),
        site: state.get('site').toJS(),
        error: state.get('siteError').toJS()
    };
};

export const SiteAddContainer = connect(
    mapStateToProps,
    actions
)(SiteAdd);
