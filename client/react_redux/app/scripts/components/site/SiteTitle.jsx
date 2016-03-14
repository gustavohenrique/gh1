import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

export class SiteTitle extends React.Component {

    constructor (props) {
        super(props);
        this.state = { editMode: false };
        this.handleOnDoubleClickEnterEditMode = this.handleOnDoubleClickEnterEditMode.bind(this);
        this.handleOnBlurSaveTitle = this.handleOnBlurSaveTitle.bind(this);
        this.toogleEditMode = this.toogleEditMode.bind(this);
        this.handleOnKeyDown = this.handleOnKeyDown.bind(this);
    }

    toogleEditMode () {
        const mode = this.state.editMode;
        this.setState({ editMode: ! mode });
    }

    handleOnDoubleClickEnterEditMode () {
        if (this.props.user.isAuthenticated) {
            this.toogleEditMode();
        }
    }

    handleOnBlurSaveTitle (e) {
        const title = e.target.value;
        const { user, site, siteIndex } = this.props;
        site.title = title;
        this.props.updateSite({
            user: user,
            site: site,
            siteIndex: siteIndex
        });
        this.toogleEditMode();
    }

    handleOnKeyDown (e) {
        if (e.key === 'Enter') {
            this.handleOnBlurSaveTitle(e);
        }
        if (e.key === 'Escape') {
            this.toogleEditMode();
        }
    }

    render () {
        const { user, site, siteIndex } = this.props;
        let component = (<span onDoubleClick={this.handleOnDoubleClickEnterEditMode}>{site.title}</span>);
        if (this.state.editMode) {
            component = (<textarea onBlur={this.handleOnBlurSaveTitle} onKeyDown={this.handleOnKeyDown} defaultValue={site.title}></textarea>);
        }
        return (
            <div>
                {component}
            </div>
        );
    }
}

SiteTitle.propTypes = {
    user: PropTypes.object,
    site: PropTypes.object.isRequired,
    siteIndex: PropTypes.number.isRequired
};

export default connect(null, actions)(SiteTitle);