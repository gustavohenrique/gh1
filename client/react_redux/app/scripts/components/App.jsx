import React, { PropTypes } from 'react';
import TopBar from './TopBar.jsx';
import LoadingBar from './LoadingBar.jsx';

export default class App extends React.Component {
    render () {
        return (
            <div>
                <TopBar path={this.props.children.props.route.path} />
                <LoadingBar />
                <div className="main container">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.node.isRequired
};
