import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import { AUTHENTICATE_FAIL } from '../../types';


export class LoginContainer extends React.Component {

    constructor (props, context) {
        super(props, context);
        this.router = context.router;
        this.handleOnClickAuthenticate = this.handleOnClickAuthenticate.bind(this);
        this.handleOnKeyDownPasswordInput = this.handleOnKeyDownPasswordInput.bind(this);
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.user.isAuthenticated && nextProps.redirectAfterLogin) {
            this.router.push('/new');
            this.props.dontRedirectAgainWhileIsAutenticated();
        }
    }

    componentWillUnmount () {
        this.props.resetError(AUTHENTICATE_FAIL);
    }

    handleOnClickAuthenticate () {
        const email = this.refs.email.value || '';
        const password = this.refs.password.value || '';
        if (email && password) {
            this.props.authenticate(email, password);
        }
    }

    handleOnKeyDownPasswordInput (e) {
        if (e.key === 'Enter') {
            this.handleOnClickAuthenticate();
        }
    }

    render () {
        const { user, hasError } = this.props;
        const Panel = (<div className="ui center aligned grid">
                <div className="column">
                    <h3>Authentication</h3>
                    <div className="ui large form">
                        <div className="ui segment no-border">
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="user icon"></i>
                                    <input type="email" ref="email" placeholder="Email address" />
                                </div>
                            </div>
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="lock icon"></i>
                                    <input type="password" ref="password" onKeyDown={this.handleOnKeyDownPasswordInput} placeholder="Password" />
                                </div>
                            </div>
                            <div id="btnAuthenticate" onClick={this.handleOnClickAuthenticate} className="ui fluid large violet submit button">
                                Login
                            </div>
                        </div>
                    </div>
                </div>
            </div>);

        const Fail = hasError ? (<div className="alert alert-danger" style={{marginTop: "10px"}}>
                <span className="alert-link">There is an error in authentication.</span>
            </div>) : (<div />);

        return (
            <div className="tab-pane active in">
                {Panel}
                {Fail}
            </div>
        );
    }
}

LoginContainer.propTypes = {
    user: PropTypes.object,
    redirectAfterLogin: PropTypes.bool,
    hasError: PropTypes.bool
};

LoginContainer.contextTypes = {
    router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        user: state.get('user').toJS(),
        redirectAfterLogin: state.get('redirectAfterLogin'),
        hasError: state.get('errors').contains(AUTHENTICATE_FAIL)
    };
};

export default connect(mapStateToProps, actions)(LoginContainer);
