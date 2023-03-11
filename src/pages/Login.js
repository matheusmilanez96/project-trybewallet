import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { submitLogin } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      isButtonDisabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.enableBtn = this.enableBtn.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.enableBtn);
  }

  enableBtn = () => {
    // email validation logic source: https://www.simplilearn.com/tutorials/javascript-tutorial/email-validation-in-javascript
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let counter = 0;
    const minLength = 6;
    const {
      email,
      password,
    } = this.state;
    if (!email.match(validRegex)) {
      counter += 1;
    }
    if (password.length < minLength) {
      counter += 1;
    }
    if (counter === 0) {
      this.setState({
        isButtonDisabled: false,
      });
    } else {
      this.setState({
        isButtonDisabled: true,
      });
    }
  };

  render() {
    const { email, password, isButtonDisabled } = this.state;
    const { history, dispatch } = this.props;

    return (
      <div>
        <form
          onSubmit={ (e) => {
            e.preventDefault();
            dispatch(submitLogin(this.state));
            history.push('/carteira');
          } }
        >
          <input
            type="text"
            data-testid="email-input"
            onChange={ this.handleChange }
            value={ email }
            name="email"
          />
          <input
            type="password"
            data-testid="password-input"
            onChange={ this.handleChange }
            value={ password }
            name="password"
          />
          <button
            type="submit"
            disabled={ isButtonDisabled }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(null)(Login);
