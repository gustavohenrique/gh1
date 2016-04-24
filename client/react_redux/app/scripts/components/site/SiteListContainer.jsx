import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Pagination from './Pagination.jsx';
import SiteList from './SiteList.jsx';
import TagModal from '../tag/TagModal';
import * as actions from '../../actions';


class SiteListContainer extends React.Component {

    componentWillMount () {
        this.props.getSites();
    }

    render () {
        const { user, sites, pagination, getSites } = this.props;
        const NoResults = (sites.length === 0) ? (<h2>No results found.</h2>) : (<span />);

        return (
            <div className="ui segment no-border">
                <div className="ui header centered align">
                    <Pagination pagination={pagination} getSites={getSites} />
                    {NoResults}
                </div>
                <SiteList user={user} sites={sites} />
            </div>
        );
    }
}

SiteListContainer.propTypes = {
    user: PropTypes.object,
    sites: PropTypes.array
};

const mapStateToProps = (state) => {
    return {
        sites: state.get('sites').toJS(),
        user: state.get('user').toJS(),
        pagination: state.get('pagination').toJS()
    };
};

export default connect(
    mapStateToProps,
    actions
)(SiteListContainer);
