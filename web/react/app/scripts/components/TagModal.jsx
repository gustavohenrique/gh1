import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { addTag } from '../actions';

class TagModal extends React.Component {
    
    constructor (props) {
        super(props);
        this.state = { inputValue: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleChange (e) {
        this.setState({ inputValue: e.target.value });
    }

    handleClick () {
        if (this.props.site && this.props.site.tags.length < 3) {
            this.props.onClickAddTag(this.state.inputValue);
            this.setState({ inputValue: '' });
        }
    }

    handleKeyPress (e) {
        if (e.key === 'Enter') {
            this.handleClick();
        }
    }

    render () {
        const { site } = this.props;

        return (
            <div id="tagModal" className="modal" tabIndex="-1" role="dialog" aria-labelledby="tagModalLabel">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 className="modal-title" id="tagModalLabel">Add Tag for site #{site ? site.id : ''}</h4>
                        </div>
                        <div className="modal-body">
                            <input value={this.state.inputValue} onChange={this.handleChange} onKeyPress={this.handleKeyPress} type="text" className="form-control" placeholder="Tag name" autoFocus />
                        </div>
                        <div className="modal-footer">
                            <button onClick={this.handleClick} type="button" className="btn btn-raised btn-primary">Add</button>
                            <button type="button" className="btn btn-raised btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        site: state.site
    };
}

function mapDispatchToProps (dispatch) {
    return {
        onClickAddTag: function (tag) {
            dispatch(addTag(tag));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TagModal);