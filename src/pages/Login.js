import { PropTypes } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
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

  // O raciocínio desta função (saveAndRedirect) foi feito com a ajuda do Estudante Jonatas Queiroz;
  // E feito com consulta neste repositório:
  // Link: https://github.com/tryber/sd-017-project-trybewallet/tree/jonatas-queiroz-project-trybewallet

  saveAndRedirect = (event) => {
    event.preventDefault();
    const { email } = this.state;
    const { userLogin, history } = this.props;
    userLogin(email);
    history.push('/carteira');
  }

  render() {
    const { disabled, email, senha } = this.state;
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
            onClick={ this.saveAndRedirect }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    userLogin: (email) => {
      dispatch(saveEmail(email));
    },
  });

Login.propTypes = {
  userLogin: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
