import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

class LoadingBar extends React.Component {

    render () {
        const { loading } = this.props;
        let width = loading ? '100%' : '0%';
        return (
            <div className="ui tiny violet active progress">
                <div id="progressBar" className="bar" style={{width: width, minWidth: '0px', borderRadius: '0px'}} />
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
