import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class TagLabel extends React.Component {

    constructor(props) {
        super(props);
        this.removeTag = this.removeTag.bind(this);
    }

    removeTag () {
        const { tag, user, site, siteIndex, index } = this.props;
        const isUserAllowedToEdit = user.id && (user.id === site.userId);
        if (isUserAllowedToEdit) {
            const params = {
                site: site,
                siteIndex: siteIndex,
                tag: tag,
                index: index,
                user: user
            };
            this.props.removeTag(params);
        }
    }

    render () {
        return (
            <a title="Double click to remove" onDoubleClick={this.removeTag} className="ui purple basic label" style={{marginBottom: "3px"}}>{this.props.tag}</a>
        );
    }
}

TagLabel.propTypes = {
    tag: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    site: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    siteIndex: PropTypes.number.isRequired,
    removeTag: PropTypes.func
};

export default connect(null, actions)(TagLabel);