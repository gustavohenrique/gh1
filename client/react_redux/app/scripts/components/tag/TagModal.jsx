import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { showModal, hideModal } from '../../util';
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
            showModal();
        }
        else {
            hideModal();
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
        const error = hasError ? 'error' : '';
        const modal = (site.id > 0) ? (<div id="tagModal" className="ui modal">
            <div className="header">Add Tag for site #{site ? site.id : ''}</div>
            <div className="content">
                <div className={"ui fluid input field " + error}>
                    <input ref="tagName" onKeyDown={this.handleOnKeyDownTagNameInput} type="text" placeholder="Tag name" autoFocus />
                </div>
            </div>
            <div className="actions">
                <button onClick={this.handleOnClickCloseModal} type="button" className="ui button">Close</button>
                <button onClick={this.handleOnclickAddTag} type="button" className="ui button violet">Add</button>
            </div>
        </div>) : (<span />);

        return modal;
    }
}

const mapStateToProps = (state) => {
    return {
        site: state.get('siteEdit').toJS(),
        hasError: state.get('errors').contains(ADD_TAG_FAIL)
    };
}

export default connect(mapStateToProps, actions)(TagModal);