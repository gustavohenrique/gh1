import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { removeTag } from '../../actions';

class TagLabel extends React.Component {

    render () {
        const { tag } = this.props;
        return (
            <a title="Double click to remove" onDoubleClick={this.props.removeTag} className="tag label label-info">{tag}</a>
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

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        removeTag: () => {
            const hasUserAllowedToEdit = ownProps.user.id && (ownProps.user.id === ownProps.site.userId);
            if (hasUserAllowedToEdit) {
                const params = {
                    site: ownProps.site,
                    siteIndex: ownProps.siteIndex,
                    tag: ownProps.tag,
                    index: ownProps.index,
                    user: ownProps.user
                };
                dispatch(removeTag(params));
            }
        }
    };
};

export default connect(null, mapDispatchToProps)(TagLabel);