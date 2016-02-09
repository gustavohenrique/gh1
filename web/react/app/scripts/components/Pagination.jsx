import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getSites, nextPage, previousPage, refreshList } from '../actions';

export class Pagination extends React.Component {

    render () {
        return (
            <nav>
                <ul className="pagination" style={{margin: 0}}>
                    <li>
                        <a className="previous" onClick={this.props.previousPage} aria-label="Previous">
                            <span className="glyphicon glyphicon-arrow-left" aria-hidden="true"></span>
                        </a>
                    </li>
                    <li><a className="current">{this.props.currentPage}</a></li>
                    <li>
                        <a className="next" onClick={this.props.nextPage} aria-label="Next">
                            <span className="glyphicon glyphicon-arrow-right" aria-hidden="true"></span>
                        </a>
                    </li>
                    <li>
                        <a className="refresh" onClick={this.props.refreshList} aria-label="Refresh">
                            <span className="glyphicon glyphicon-refresh" aria-hidden="true"></span>
                        </a>
                    </li>
                    <li className="hidden">
                        <a data-toggle="modal" data-target="#filterModal">
                            <span className="glyphicon glyphicon-filter" aria-hidden="true"></span>
                        </a>
                    </li>
                </ul>
            </nav>
        );
    }
}

Pagination.propTypes = {
    previousPage: PropTypes.func.isRequired,
    nextPage: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
    refreshList: PropTypes.func.isRequired
};

function mapStateToProps (state) {
    return {
        currentPage: state.pagination.current
    };
}

function mapDispatchToProps (dispatch, ownProps) {
    return {
        nextPage: function () {
            dispatch(nextPage());
            dispatch(getSites());
        },

        previousPage: ownProps.previousPage || function () {
            dispatch(previousPage());
            dispatch(getSites());
        },

        refreshList: function () {
            dispatch(refreshList());
            dispatch(getSites());
        }

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);