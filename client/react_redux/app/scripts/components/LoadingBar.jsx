import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

class LoadingBar extends React.Component {

    render () {
        const { loading } = this.props;
        let width = loading ? '100%' : '0%';
        
        return (
            <div className="progress active progress-striped" style={{marginBottom: 0}}>
                <div id="progressBar" className="progress-bar progress-bar-success" style={{width: width}} />
            </div>
        );
    }
}

LoadingBar.propTypes = {
    loading: PropTypes.bool
};

const mapStateToProps = (state) => {
    return {
        loading: state.get('loading')
    };
};

export default connect(mapStateToProps)(LoadingBar);
