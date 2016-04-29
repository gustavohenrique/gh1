import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import TagLabel from './TagLabel.jsx';
import * as actions from '../../actions';

export class Tags extends React.Component {

    constructor (props) {
        super(props);
        this.handleOnClickOpenModal = this.handleOnClickOpenModal.bind(this);
    }

    handleOnClickOpenModal () {
        const { site, siteIndex } = this.props;
        this.props.setSiteEdit(site, siteIndex);
    }

    render () {
        const { user, site, siteIndex } = this.props;
        const hasUserAllowedToEdit = user.id && (user.id === site.userId);
        const shouldShowAddTagButton = (hasUserAllowedToEdit && site.tags.length < 3);

        return (
            <div>
                {site.tags.map(function (tag, index) {
                    return (tag !== '') ? <TagLabel key={index} index={index} tag={tag} site={site} siteIndex={siteIndex} user={user} /> : null;
                })}
                <a onClick={this.handleOnClickOpenModal} title="Add tag (max allowed is 3)" style={shouldShowAddTagButton ? {color: "#9627ba", padding: "5px"} : {display:"none"}}>
                    <i className="plus icon"></i>
                </a>
            </div>
        );
    }
}

Tags.propTypes = {
    user: PropTypes.object,
    site: PropTypes.object,
    siteIndex: PropTypes.number.isRequired
};

export const TagContainer = connect(null, actions)(Tags);