import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import TagLabel from './TagLabel.jsx';
import { setSite } from '../actions';

class TagContainer extends React.Component {

    render () {
        const { site, siteIndex } = this.props;
        return (
            <div>
                {site.tags.map(function (tag, index) {
                    return (tag !== '') ? <TagLabel key={index} index={index} tag={tag} site={site} siteIndex={siteIndex} /> : null;
                })}
                <a onClick={this.props.setSite} title="Add tag (max allowed is 3)" style={(site.tags.length > 2) ? {display:"none"} : null} data-toggle="modal" data-target="#tagModal" className="tag btn btn-primary btn-xs">
                    + <i className="glyphicon glyphicon-tags"></i>
                </a>
            </div>
        );
    }
}

TagContainer.propTypes = {
    site: PropTypes.object.isRequired,
    siteIndex: PropTypes.number.isRequired,
    setSite: PropTypes.func.isRequired
};

function mapDispatchToProps (dispatch, ownProps) {
    return {
        setSite: function () {
            dispatch(setSite(ownProps.site, ownProps.siteIndex));
        }
    };
}

export default connect(null, mapDispatchToProps)(TagContainer);
