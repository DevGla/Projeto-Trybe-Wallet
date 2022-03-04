import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { saveState } from '../actions';
import requisicaoAPI from './requisicao';

class AdicaoDespesas extends React.Component {
  constructor() {
    super();

    this.state = {
      valor: '',
      descricao: '',
      currency: '',
      selected: '',
      selected2: '',
      id: 0,
      coins: [],
    };
  }

  // FUNÇÃO FEITA COM A AJUDA DA PESSOA ESTUDANTE WILLIAM ALVES
  // LINK PARA REPOSITÓRIO DO MESMO: https://github.com/tryber/sd-017-project-trybewallet/tree/willian-alves-project-trybe-wallet
  componentDidMount() {
    requisicaoAPI().then((data) => {
      console.log(data);
      console.log(Object.entries(data));
      const coin = Object.entries(data).filter(([key]) => key !== 'USDT')
        .map(([, value]) => value.code);
      console.log(coin);
      this.setState({ coins: coin });
    });
  }

  handleChange = ({ target: { id, value } }) => {
    this.setState(
      {
        [id]: value,
      },
      this.validate,
    );
  };

  saveAndDispatch = () => {
    const { handleClick } = this.props;
    const { valor, descricao, moeda, select, selected2, id } = this.state;
    this.setState((currentState) => ({ id: currentState.id + 1 }));
    const state = { valor, descricao, moeda, select, selected2, id };
    handleClick(state);
  }

  render() {
    const { valor, descricao, currency, selected, selected2, coins } = this.state;
    return (
      <div>
        <form>
          { coins }
          <label htmlFor="valor">
            Valor de gastos:
            <input
              type="text"
              id="valor"
              data-testid="value-input"
              name="name"
              value={ valor }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="descricao">
            Descrição da despesa:
            <input
              type="text"
              id="descricao"
              data-testid="description-input"
              name="name"
              value={ descricao }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="coin">
            Coin:
            <select
              onChange={ this.handleChange }
              name="currency"
              value={ currency }
              data-testid="currency-input"
              id="coin"
              aria-label="moeda"
            >
              { coins.length > 0 && coins.map((moedas) => (
                <option
                  data-testid={ moedas }
                  key={ moedas }
                  value={ moedas }
                >
                  { moedas }
                </option>
              )) }
            </select>
          </label>
          <select
            value={ selected }
            onChange={ this.handleChange }
            data-testid="method-input"
            id="selected"
          >
            <option value="dinheiro">dinheiro</option>
            <option value="cartão de crédito">cartão de crédito</option>
            <option value="cartão de dbito">cartão de débito</option>
          </select>
          <select
            value={ selected2 }
            onChange={ this.handleChange }
            data-testid="tag-input"
            id="selected2"
          >
            <option value="alimentação">alimentação</option>
            <option value="lazer">lazer</option>
            <option value="trabalho">trabalho</option>
            <option value="transporte">transporte</option>
            <option value="saúde">saúde</option>
          </select>
          <button
            type="button"
            onClick={ this.saveAndDispatch }
          >
            Adicionar Despesas
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    handleClick: (state) => {
      dispatch(saveState(state));
    },
  });

AdicaoDespesas.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(AdicaoDespesas);
