import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

export default class Pagination extends React.Component {

    constructor(props) {
        super(props);
        this.previousPage = this.previousPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.refreshFirstPage = this.refreshFirstPage.bind(this);
    }

    previousPage () {
        const previous = this.props.pagination.previous;
        const pagination = Object.assign({}, this.props.pagination, { page: previous });
        this.props.getSites(pagination);
    }

    nextPage () {
        const next = this.props.pagination.next;
        const pagination = Object.assign({}, this.props.pagination, { page: next });
        this.props.getSites(pagination);
    }

    refreshFirstPage () {
        const pagination = Object.assign({}, this.props.pagination, { page: 1 });
        this.props.getSites(pagination);
    }

    render () {
        return (
            <nav>
                <ul className="pagination" style={{margin: 0}}>
                    <li>
                        <a className="previous" onClick={this.previousPage}>
                            <span className="glyphicon glyphicon-arrow-left"></span>
                        </a>
                    </li>
                    <li><a className="current">{this.props.pagination.current}</a></li>
                    <li>
                        <a className="next" onClick={this.nextPage}>
                            <span className="glyphicon glyphicon-arrow-right"></span>
                        </a>
                    </li>
                    <li>
                        <a className="refresh" onClick={this.refreshFirstPage}>
                            <span className="glyphicon glyphicon-refresh"></span>
                        </a>
                    </li>
                </ul>
            </nav>
        );
    }
}

Pagination.propTypes = {
    pagination: PropTypes.object.isRequired,
    getSites: PropTypes.func.isRequired
};
