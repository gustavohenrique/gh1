import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';


export class SearchBar extends React.Component {

    constructor (props) {
        super(props);
        this.handleOnKeyDownClearTag = this.handleOnKeyDownClearTag.bind(this);
    }

    componentWillMount () {
        const { user } = this.props;
        this.props.getTags({ user: user });
    }

    componentWillReceiveProps () {
        const setSearchTag = (result, response) => {
            this.props.setSearchTag(result.title);
            this.props.getSites({ pagination: { page: 1, perPage: 12 } });
        };

        $('#searchBar').search({ source: this.props.tags, onSelect: setSearchTag });
    }

    handleOnKeyDownClearTag (e) {
        const tagName = this.refs.tagName.value;

        let isEmpty = false;
        if (e.key === 'Backspace' && tagName.length <= 1) {
            isEmpty = true;
        }
        
        if (e.key === 'Escape' || isEmpty) {
            this.refs.tagName.value = null;
            this.props.setSearchTag(null);
            this.props.getSites();
        }
    }

    render() {
        const { user } = this.props;
        return (
            <div id="searchBar" className="ui transparent inverted left icon input search">
                <input ref="tagName" onKeyDown={this.handleOnKeyDownClearTag} type="text" placeholder="Search by tag..." className="prompt" />
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
