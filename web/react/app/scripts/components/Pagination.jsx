import { connect } from 'react-redux'

import { getSites, nextPage, previousPage, refreshList } from '../actions'

class Pagination extends React.Component {
    render () {
        return (
            <nav>
                <ul className="pagination">
                    <li>
                        <a onClick={this.props.previousPage} aria-label="Previous">
                            <span className="glyphicon glyphicon-arrow-left" aria-hidden="true"></span>
                        </a>
                    </li>
                    <li><a>{this.props.currentPage}</a></li>
                    <li>
                        <a onClick={this.props.nextPage} aria-label="Next">
                            <span className="glyphicon glyphicon-arrow-right" aria-hidden="true"></span>
                        </a>
                    </li>
                    <li>
                        <a onClick={this.props.refreshList} aria-label="Next">
                            <span className="glyphicon glyphicon-refresh" aria-hidden="true"></span>
                        </a>
                    </li>
                    <li>
                        <a data-toggle="modal" data-target="#filterModal">
                            <span className="glyphicon glyphicon-filter" aria-hidden="true"></span>
                        </a>
                    </li>
                </ul>
            </nav>
        )
    }
}

function mapStateToProps (state) {
    return {
        currentPage: state.pagination.current
    }
}

function mapDispatchToProps (dispatch) {
    return {
        nextPage: function () {
            dispatch(nextPage());
            dispatch(getSites());
        },

        previousPage: function () {
            dispatch(previousPage());
            dispatch(getSites());
        },

        refreshList: function () {
            dispatch(refreshList());
            dispatch(getSites());
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination)