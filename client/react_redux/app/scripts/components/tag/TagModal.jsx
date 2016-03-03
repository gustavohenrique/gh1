import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { showBackgroundModal, hideBackgroundModal } from '../../util';
import { ADD_TAG_FAIL } from '../../types';

class TagModal extends React.Component {
    
    constructor (props) {
        super(props);
        this.handleOnclickAddTag = this.handleOnclickAddTag.bind(this);
        this.handleOnClickCloseModal = this.handleOnClickCloseModal.bind(this);
        this.handleOnKeyDownTagNameInput = this.handleOnKeyDownTagNameInput.bind(this);
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.site && nextProps.site.id) {
            showBackgroundModal();
        }
        else {
            hideBackgroundModal();
        }
    }

    componentWillUnmount () {
        this.handleOnClickCloseModal();
    }

    handleOnClickCloseModal () {
        this.props.resetError(ADD_TAG_FAIL);
        this.props.setSiteEdit({}, 0);
    }

    handleOnclickAddTag () {
        const tagName = this.refs.tagName.value || '';
        if (this.props.site && this.props.site.tags.length < 3 && tagName !== '') {
            this.props.addTag(tagName.trim());
            this.refs.tagName.value = '';
        }
    }

    handleOnKeyDownTagNameInput (e) {
        if (e.key === 'Enter') {
            this.handleOnclickAddTag();
        }
        if (e.key === 'Escape') {
            this.handleOnClickCloseModal();
        }
    }

    render () {
        const { site, hasError } = this.props;
        const component = (site.id > 0) ? (<div id="tagModal" className="tag-modal" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content form-group">
                    <div className="modal-header">
                        <button onClick={this.handleOnClickCloseModal} type="button" className="close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 className="modal-title" id="tagModalLabel">Add Tag for site #{site ? site.id : ''}</h4>
                    </div>
                    <div className="modal-body">
                        <input ref="tagName" onKeyDown={this.handleOnKeyDownTagNameInput} type="text" className="form-control" placeholder="Tag name" autoFocus />
                        <div className="validation-error" style={hasError ? {fontSize: "12px", color: "red", marginBottom: "10px"} : {display: "none"}}>Error adding tag.</div>
                
                    </div>
                    <div className="modal-footer" style={{marginRight: "20px"}}>
                        <button onClick={this.handleOnclickAddTag} type="button" className="btn btn-raised btn-primary">Add</button>
                        <button onClick={this.handleOnClickCloseModal} type="button" className="btn btn-raised btn-default">Close</button>
                    </div>
                </div>
            </div>
        </div>) : (<span />);

        return (
            <span>
                {component}
            </span>
        )
        
    }
}

const mapStateToProps = (state) => {
    return {
        site: state.get('siteEdit').toJS(),
        hasError: state.get('errors').contains(ADD_TAG_FAIL)
    };
}

export default connect(mapStateToProps, actions)(TagModal);