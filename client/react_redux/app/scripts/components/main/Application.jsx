import React, { PropTypes } from 'react';
import AppBar from './AppBar.jsx';
import LoadingBar from './LoadingBar.jsx';


export default class Application extends React.Component {
    render () {
        return (
            <div className="container-fluid">
                <AppBar path={this.props.children.props.route.path} />
                <LoadingBar />
                <div className="tab-content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

Application.propTypes = {
    children: PropTypes.node.isRequired
};