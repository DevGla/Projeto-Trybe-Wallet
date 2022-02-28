import { PropTypes } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { saveEmail } from '../actions';

// Regex para validar os caracteres do email
const VALIDATE_EMAIL = /[a-z0-9]+[@]+[a-z]+[.]+[a-z]/;
const PASSWORD_LENGTH = 5;

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      disabled: true,
      email: '',
      senha: '',
      redirect: false,
    };
  }

  validate = () => {
    const { email, senha } = this.state;
    if (VALIDATE_EMAIL.test(email) && senha.length > PASSWORD_LENGTH) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  };

  handleChange = ({ target: { id, value } }) => {
    this.setState(
      {
        [id]: value,
      },
      this.validate,
    );
  };

  /* saveAndRedirect = (param) => {
    this.handleClick(param);
  } */

  render() {
    const { disabled, email, senha, redirect } = this.state;
    const { handleClick } = this.props;
    return (
      <div>
        <form>
          <h1>Tela de Login</h1>
          <label htmlFor="email">
            Digite seu email:
            <input
              type="text"
              id="email"
              data-testid="email-input"
              name="name"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="senha">
            Digite sua senha:
            <input
              type="password"
              id="senha"
              data-testid="password-input"
              name="name"
              value={ senha }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            disabled={ disabled }
            onClick={ () => handleClick(email) }
          >
            Entrar
          </button>
        </form>
        {redirect ? <Redirect to="/carteira" /> : ''}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    handleClick: (email) => {
      dispatch(saveEmail(email));
    },
  });

Login.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
