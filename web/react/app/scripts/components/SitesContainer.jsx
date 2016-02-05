import Pagination from './Pagination.jsx'
import SiteItem from './SiteItem.jsx'
import TagModal from './TagModal.jsx'

import { connect } from 'react-redux'

import { getSites } from '../actions'


class SitesContainer extends React.Component {

    componentWillMount () {
        let { dispatch } = this.props;
        dispatch(getSites());
    }

    render () {
        const { sites } = this.props

        return (
            <div className={this.props.isWaitingRequest ? "hidden" : "well"}>
                <TagModal />
                <div className="row">
                    <div className="col-md-4 col-md-offset-5 col-xs-offset-1">
                        <Pagination />                        
                    </div>
                </div>
                <div className="row">
                    {sites.map(function (item, index) {
                        return <SiteItem key={index} site={item} siteIndex={index} />
                    })}
                </div>
                <div className="row">
                    <div className="col-md-4 col-md-offset-5 col-xs-offset-1">
                        <Pagination />                        
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        sites: state.sites,
        isFetching: state.isFetching,
        isWaitingRequest: state.isWaitingRequest
    }
}

export default connect(mapStateToProps)(SitesContainer)
