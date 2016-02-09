import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Pagination from './Pagination.jsx';
import SiteItem from './SiteItem.jsx';
import TagModal from './TagModal.jsx';
import { getSites } from '../actions';

class SitesContainer extends React.Component {

    componentWillMount () {
        const { dispatch } = this.props;
        dispatch(getSites());
    }

    render () {
        const { sites } = this.props;

        return (
            <div className={this.props.isWaitingRequest ? "hidden" : "well"}>
                <TagModal />
                <div className="row center-block" style={{textAlign: "center"}}>
                    <Pagination />
                </div>
                <div className="row">
                    {sites.map(function (item, index) {
                        return <SiteItem key={index} site={item} siteIndex={index} />;
                    })}
                </div>
                <div className="row center-block" style={{textAlign: "center"}}>
                    <Pagination />
                </div>
            </div>
        );
    }
}

SitesContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    sites: PropTypes.array.isRequired,
    isWaitingRequest: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        sites: state.sites,
        isFetching: state.isFetching,
        isWaitingRequest: state.isWaitingRequest
    };
}

export default connect(mapStateToProps)(SitesContainer);
