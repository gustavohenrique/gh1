import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import * as util from '../../util';
import SiteSimpleCard from './SiteSimpleCard.jsx';
import Message from '../Message.jsx';
import * as actions from '../../actions';
import { ADD_SITE_FAIL } from '../../types';


const INITIAL_COMPONENT_STATE = {
    longUrl: '',
    longUrlIsValid: true
};

export class SiteAdd extends React.Component {

    constructor (props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = INITIAL_COMPONENT_STATE;

        this.handleOnClickAddSite = this.handleOnClickAddSite.bind(this);
        this.handleOnKeyDownAddSite = this.handleOnKeyDownAddSite.bind(this);
    }

    componentWillReceiveProps () {
        this.setState(INITIAL_COMPONENT_STATE);
    }

    componentWillUnmount () {
        this.props.resetError(ADD_SITE_FAIL);
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
        const { site, hasError } = this.props;
        const shouldShowError = hasError || ! this.state.longUrlIsValid;

        let field = 'field error';
        let errorMessage = 'Please enter a valid URL address';
        if (this.state.longUrlIsValid) {
            field = 'field';
            errorMessage = 'Cannot be possible to add this site.';
        }

        const Success = (site && site.shortUrl && ! shouldShowError) ? (<SiteSimpleCard ref="card" site={site} />) : (<div />);
        const Fail = shouldShowError ? (<Message ref="message" header={errorMessage} message="" type="error" />) : null;

        return (
            <div className="ui segment no-border">
                <div className={"ui fluid action labeled input " + field}>
                    <input ref="longUrl" onKeyDown={this.handleOnKeyDownAddSite} type="text" style={{borderRadius: "0px"}} placeholder="URL for..." />
                    <button onClick={this.handleOnClickAddSite} className="ui primary button" type="button">Shorten</button>
                </div>
                <div style={{marginTop: "10px"}}>
                    {Fail}
                    {Success}
                </div>
            </div>
        );
    }
}

SiteAdd.propTypes = {
    user: PropTypes.object,
    site: PropTypes.object,
    hasError: PropTypes.bool
};

const mapStateToProps = (state) => {
    return {
        user: state.get('user').toJS(),
        site: state.get('site').toJS(),
        hasError: state.get('errors').contains(ADD_SITE_FAIL)
    };
};

export const SiteAddContainer = connect(
    mapStateToProps,
    actions
)(SiteAdd);
