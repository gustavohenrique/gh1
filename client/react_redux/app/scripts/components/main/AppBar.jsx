import React from 'react';
import { Link } from 'react-router';


export default class AppBar extends React.Component {

    render() {
        const { path } = this.props;

        return (
            <nav className="navbar navbar-default navbar-fixed-top navbar-inverse">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand">GH1</a>
                </div>
                <div id="navbar" className="navbar-collapse collapse">
                    <ul className="nav navbar-nav">
                        <li className={path === 'new' || path === undefined  ? 'active' : ''}>
                            <Link to="new">New</Link>
                        </li>
                        <li className={path === 'list' ? 'active' : ''}>
                            <Link to="list">List</Link>
                        </li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right" style={{marginRight: "0"}}>
                        <li className={path === 'auth' ? 'active' : ''}>
                            <Link to="auth">
                                <span className="glyphicon glyphicon-user" aria-hidden="true" />
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}
