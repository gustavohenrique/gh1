import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import SearchBar from './tag/SearchBar.jsx';


export class TopBar extends React.Component {

    render() {
        const { path, user } = this.props;
        const authIcon = (user && user.isAuthenticated) ? 'unlock icon' : 'lock icon';
        const searchBar = (path === 'list') ? (<SearchBar />) : null;
        return (
            <div className="ui fixed inverted menu">
                <div className="ui container">
                    <a className="header item">GH1</a>
                    <Link className={path === 'new' || path === undefined ? 'item active' : 'item'} to="new">New</Link>
                    <Link className={path === 'list' ? 'item active' : 'item'} to="list">List</Link>
                    <div className="right menu">
                        {searchBar}
                        <Link className={path === 'auth' ? 'item active' : 'item'} to="auth">
                            <i className={authIcon}></i>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

TopBar.propTypes ={
    path: PropTypes.string.isRequired,
    user: PropTypes.object
};

const mapStateToProps = (state) => {
    return {
        user: state.get('user').toJS()
    };
};

export default connect(mapStateToProps)(TopBar);
