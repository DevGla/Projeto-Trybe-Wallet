import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { saveState } from '../actions';
import requisicaoAPI from './requisicao';

class AdicaoDespesas extends React.Component {
  constructor() {
    super();

    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: '',
      tag: '',
      coins: '',
      soma: '',
      exchangeRates: '',
    };
  }

  // FUNÇÃO FEITA COM A AJUDA DA PESSOA ESTUDANTE WILLIAM ALVES
  // LINK PARA REPOSITÓRIO DO MESMO: https://github.com/tryber/sd-017-project-trybewallet/tree/willian-alves-project-trybe-wallet
  componentDidMount() {
    requisicaoAPI().then((data) => {
      const coin = Object.entries(data).filter(([key]) => key !== 'USDT')
        .map(([, value]) => value.code);
      this.setState({ coins: coin });
    });
  }

  handleChange = ({ target: { id, value } }) => {
    this.setState(
      {
        [id]: value,
      },
    );
  };

  totalExpenses = (data, state) => {
    const list = Object.entries(data);
    const { currency } = this.state;
    const totalAsk = list.filter(([key]) => key === currency)
      .map(([, value]) => value.ask);
    return Number(totalAsk) * Number(state);
  }

  handleExpense = () => {
    const { handleClick } = this.props;
    const {
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates,
      soma,
    } = this.state;
    const expense = { value, currency, method, tag, description, exchangeRates };
    handleClick(expense, Number(soma));
  }

  saveAndDispatch = async () => {
    await requisicaoAPI().then((data) => {
      this.setState((prevState) => ({
        exchangeRates: data,
        soma: this.totalExpenses(data, prevState.value),
      }), this.handleExpense);
    });
    this.setState({
      value: 0,
    });
  }

  render() {
    const { value, description, currency, method, tag, coins } = this.state;
    const { handleClick,
      stateUser: { email },
      stateWallet: { expenses, soma } } = this.props;
    return (
      <div>
        <header>
          <h3>TrybeWallet</h3>
          <p data-testid="email-field">{ email }</p>
          <p>Total Expense:</p>
          <p data-testid="total-field">{ soma || 0 }</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <form>
          <label htmlFor="value">
            Valor de gastos:
            <input
              type="text"
              id="value"
              data-testid="value-input"
              name="name"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="description">
            Descrição da despesa:
            <input
              type="text"
              id="description"
              data-testid="description-input"
              name="name"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currency">
            moeda:
            <select
              onChange={ this.handleChange }
              name="currency"
              value={ currency }
              data-testid="currency-input"
              id="currency"
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
            value={ method }
            onChange={ this.handleChange }
            data-testid="method-input"
            id="method"
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
          <select
            value={ tag }
            onChange={ this.handleChange }
            data-testid="tag-input"
            id="tag"
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
          <button
            type="button"
            onClick={ () => this.saveAndDispatch(handleClick) }
          >
            Adicionar Despesas
          </button>
        </form>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { expenses && expenses.map((expense) => (
              <tr key={ expense.id }>
                <td>{ expense.description }</td>
                <td>{ expense.tag }</td>
                <td>{ expense.method }</td>
                <td>{ Number(expense.value).toFixed(2) }</td>
                <td>{ expense.exchangeRates[expense.currency].name }</td>
                <td>
                  {
                    Number(expense.exchangeRates[expense.currency].ask).toFixed(2)
                  }
                </td>
                <td>
                  {
                    Number(expense.exchangeRates[expense.currency].ask * expense.value)
                      .toFixed(2)
                  }
                </td>
                <td>Real</td>
              </tr>
            )) }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    handleClick: (state, soma) => {
      dispatch(saveState(state, soma));
    },
  });

const mapStateToProps = (state) => ({
  stateUser: state.user,
  stateWallet: state.wallet,
});

AdicaoDespesas.propTypes = {
  handleClick: PropTypes.func.isRequired,
  stateUser: PropTypes.string.isRequired,
  stateWallet: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdicaoDespesas);
