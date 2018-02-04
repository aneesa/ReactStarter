import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Actions from 'actions';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import TextInput from 'common/TextInput';
import Button from 'common/Button';
import Loading from 'common/Loading';
import * as Validation from 'utils/validation';

const selector = formValueSelector('login');
const formFields = ['email', 'password'];

class SignIn extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { token: nextToken } = nextProps;
    const { token, history } = this.props;

    if (!token && nextToken) {
      history.push('/home');
    }
  }

  handleSubmit(e) {
    const { invalid, touch, loginFormValues } = this.props;
    e.preventDefault();
    touch(...formFields); // this is to make sure the error message is displayed if user no enter anything
    if (invalid) {
      return;
    }
    this.props.signIn(loginFormValues);
  }

  renderSignIn() {
    return (
      <form className="form-container" onSubmit={this.handleSubmit}>
        <div className="form-field">
          <Field
            title="Email"
            name="email"
            component={TextInput}
            type="email"
            iconName="envelope"
            placeholder="Email"
            validate={[Validation.required, Validation.email]}
          />
        </div>
        <div className="form-field">
          <Field
            title="Password"
            name="password"
            component={TextInput}
            type="password"
            placeholder="Password"
            iconName="unlock-alt"
            validate={[Validation.required]}
          />
        </div>
        <div className="form-button">
          <Button type="submit" label="Sign In" color="primary" />
        </div>
      </form>
    );
  }

  render() {
    const { isLoading } = this.props;
    return (
      <div className="container">
        {this.renderSignIn()}
        {isLoading && <Loading />}
      </div>
    );
  }
}

SignIn.propTypes = {
  signIn: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  touch: PropTypes.func.isRequired,
  token: PropTypes.string,
  loginFormValues: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
};

SignIn.defaultProps = {
  token: null,
};

const mapStateToProps = store => ({
  token: Actions.getToken(store),
  isLoading: store.AUTH.signIn.isLoading,
  loginFormValues: selector(store, ...formFields),
});

const mapDispatchToProps = {
  signIn: Actions.signIn,
};

const MyForm = reduxForm({
  form: 'login',
})(SignIn);

export default connect(mapStateToProps, mapDispatchToProps)(MyForm);
