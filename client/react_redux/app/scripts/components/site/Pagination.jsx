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
            <div className="ui pagination menu">
                <a className="icon item" onClick={this.previousPage}><i className="left arrow icon"></i></a>
                <span className="icon disabled item">{this.props.pagination.current}</span>
                <a className="icon item" onClick={this.nextPage}><i className="right arrow icon"></i></a>
                <a className="icon item" onClick={this.refreshFirstPage}><i className="refresh icon"></i></a>
            </div>
        );
    }
}

Pagination.propTypes = {
    pagination: PropTypes.object.isRequired,
    getSites: PropTypes.func.isRequired
};
