import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Pagination from './Pagination.jsx';
import SiteItem from './SiteItem.jsx';
import TagModal from './tags/TagModal.jsx';
import { getSites } from '../../actions/sitesActions';

class SitesContainer extends React.Component {

    componentWillMount () {
        this.props.dispatch(getSites());
    }

    render () {
        const { user, sites, isWaitingRequest, endpoints } = this.props;
        const noSitesFound = sites.length === 0;

        return (
            <div className={isWaitingRequest ? "hidden" : "well"}>
                <TagModal />
                <div className="row center-block" style={{textAlign: "center"}}>
                    <Pagination />
                </div>
                <div className="row">
                    {sites.map(function (item, index) {
                        return <SiteItem key={index} user={user} site={item} siteIndex={index} endpoints={endpoints} />;
                    })}
                    <div className={noSitesFound ? "row center-block" : "hidden"} style={{textAlign: "center"}}>
                        <h2>No results found.</h2>
                    </div>
                </div>
                <div className={noSitesFound ? "hidden" : "row center-block"} style={{textAlign: "center"}}>
                    <Pagination />
                </div>
            </div>
        );
    }
}

SitesContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isWaitingRequest: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        sites: state.sites,
        isFetching: state.isFetching,
        isWaitingRequest: state.isWaitingRequest,
        user: state.user,
        endpoints: state.endpoints
    };
}

export default connect(mapStateToProps)(SitesContainer);
