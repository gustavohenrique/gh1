import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { addTag, setSite } from '../../../actions/sitesActions';

class TagModal extends React.Component {
    
    constructor (props) {
        super(props);
        this.state = { tagName: '' };
        this.handleOnChangeTagName = this.handleOnChangeTagName.bind(this);
        this.handleOnclickAddTag = this.handleOnclickAddTag.bind(this);
        this.handleOnClickCloseModal = this.handleOnClickCloseModal.bind(this);
        this.handleOnKeyDownTagNameInput = this.handleOnKeyDownTagNameInput.bind(this);
    }

    handleOnChangeTagName (e) {
        this.setState({ tagName: e.target.value });
    }

    handleOnClickCloseModal () {
        this.props.dispatch(setSite(null, null));
        document.querySelector('#backgroundModal').classList.add('hidden');
    }

    handleOnclickAddTag () {
        const tagName = this.state.tagName;
        if (this.props.site && this.props.site.tags.length < 3 && tagName !== '') {
            this.props.dispatch(addTag(tagName));
            this.setState({ tagName: '' });
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
        const { site } = this.props;

        return (
            <div id="tagModal" className={site ? "tag-modal" : "hidden"} tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content form-group">
                        <div className="modal-header">
                            <button onClick={this.handleOnClickCloseModal} type="button" className="close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 className="modal-title" id="tagModalLabel">Add Tag for site #{site ? site.id : ''}</h4>
                        </div>
                        <div className="modal-body">
                            <input value={this.state.tagName} onChange={this.handleOnChangeTagName} onKeyDown={this.handleOnKeyDownTagNameInput} type="text" className="form-control" placeholder="Tag name" autoFocus />
                        </div>
                        <div className="modal-footer" style={{marginRight: "20px"}}>
                            <button onClick={this.handleOnclickAddTag} type="button" className="btn btn-raised btn-primary">Add</button>
                            <button onClick={this.handleOnClickCloseModal} type="button" className="btn btn-raised btn-default">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        site: state.site
    };
}

export default connect(mapStateToProps, null)(TagModal);