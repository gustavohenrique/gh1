import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { authenticate, dontRedirectAgainWhileIsAutenticated } from '../../actions';

export class LoginContainer extends React.Component {

    constructor (props) {
        super(props);
        this.state = { email: '', password: '' };
        this.handleOnChangeSetEmail = this.handleOnChangeSetEmail.bind(this);
        this.handleOnChangeSetPassword = this.handleOnChangeSetPassword.bind(this);
        this.handleOnClickAuthenticate = this.handleOnClickAuthenticate.bind(this);
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.user.isAuthenticated && nextProps.redirectAfterLogin) {
            nextProps.history.push('/new');
            this.props.dispatch(dontRedirectAgainWhileIsAutenticated());
        }
    }

    handleOnChangeSetEmail (e) {
        this.setState({ email: e.target.value });
    }

    handleOnChangeSetPassword (e) {
        this.setState({ password: e.target.value });
    }

    handleOnClickAuthenticate () {
        this.props.dispatch(authenticate(this.state.email, this.state.password));
    }

    render () {
        const { user, errors } = this.props;
        const hasErrors = errors && errors.code;
        const isAuthenticated = user && user.isAuthenticated;

        return (
            <div className="tab-pane active in">
                <div className={hasErrors && ! isAuthenticated ? "alert alert-danger" : "hidden"}>
                    <span className="alert-link">There is an error in authentication.</span>
                </div>
                <div className={isAuthenticated ? "hidden" : "well login"}>
                    <h3>Authentication</h3>
                    <div className="form-group" style={{margin: "0"}}>
                        <input type="email" onChange={this.handleOnChangeSetEmail} className="form-control email" placeholder="Email" />
                    </div>
                    <div className="form-group" style={{margin: "0"}}>
                        <input type="password" onChange={this.handleOnChangeSetPassword} className="form-control password" placeholder="Password" />
                    </div>
                    <span className="input-group-btn">
                        <button id="btnAuthenticate" onClick={this.handleOnClickAuthenticate} className="btn btn-raised btn-primary" type="button">Login</button>
                    </span>
                </div>
                <div className={isAuthenticated ? "well logged" : "hidden"}>
                    <h3>Logged as {user && user.email ? user.email : ''}</h3>
                </div>
            </div>
        );
    }
}

LoginContainer.propTypes = {
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
        errors: state.errors,
        redirectAfterLogin: state.redirectAfterLogin
    };
};

export default connect(mapStateToProps)(LoginContainer);


