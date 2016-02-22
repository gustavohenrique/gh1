import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

class LoadingBar extends React.Component {

    render () {
        const { isFetching } = this.props;
        let width = isFetching ? '100%' : '0%';
        
        return (
            <div className="progress active progress-striped" style={{marginBottom: 0}}>
                <div id="progressBar" className="progress-bar progress-bar-success" style={{width: width}} />
            </div>
        );
    }
}

LoadingBar.propTypes = {
    isFetching: PropTypes.bool.isRequired
};

function mapStateToProps (state) {
    return {
        isFetching: state.isFetching
    };
}

export default connect(mapStateToProps)(LoadingBar);
