import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';


export class SearchBar extends React.Component {

    componentWillMount () {
        const { user } = this.props;
        this.props.getTags({ user: user });
    }

    componentWillReceiveProps () {
        const setSearchTag = (result, response) => {
            console.log('result', result, 'response', response);
            this.props.setSearchTag(result.title);
            this.props.getSites();
        };

        $('#searchBar').search({ source: this.props.tags, onSelect: setSearchTag });
    }

    render() {
        const { user } = this.props;
        return (
            <div id="searchBar" className="ui transparent inverted left icon input search">
                <input type="text" placeholder="Search by tag..." className="prompt" />
                <i className="search icon"></i>
                <div className="results"></div>
            </div>
            
        );
    }
}

SearchBar.propTypes ={
    user: PropTypes.object
};

const mapStateToProps = (state) => {
    return {
        user: state.get('user').toJS(),
        tags: state.get('tags').toJS()
    };
};

export default connect(mapStateToProps, actions)(SearchBar);
