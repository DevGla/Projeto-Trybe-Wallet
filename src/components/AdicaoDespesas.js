import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from './Header';
import requisicaoAPI from './requisicao';
import { deleteState, saveCoin,
  editState, saveExpense } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      buttonEdit: false,
      exchangeRates: {},
    };
  }

  // FUNÇÃO FEITA COM A AJUDA DA PESSOA ESTUDANTE WILLIAM ALVES
  // LINK PARA REPOSITÓRIO DO MESMO: https://github.com/tryber/sd-017-project-trybewallet/tree/willian-alves-project-trybe-wallet
  // Feito antes do novo
  componentDidMount() {
    const { handleClick } = this.props;
    requisicaoAPI().then((data) => {
      const coin = Object.entries(data).filter(([key]) => key !== 'USDT')
        .map(([, value]) => value.code);
      handleClick(coin);
    });
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }

  handleClick = async (e) => {
    e.preventDefault();
    const { value,
      description, currency, method, tag, buttonEdit, id, exchangeRates } = this.state;
    const { expenses, handleSave, handleEdit } = this.props;
    if (buttonEdit) {
      const expenseStore = expenses;
      const obj = { id, value, description, currency, method, tag, exchangeRates };
      expenseStore.splice(id, 1, obj);
      handleEdit(expenseStore);
      this.setState({ buttonEdit: false });
    } else {
      const obj = { id: expenses.length, value, description, currency, method, tag };
      const data = await requisicaoAPI().then((dataExchange) => dataExchange);
      delete data.USDT;
      console.log(data);
      const payload = { ...obj, exchangeRates: data };
      handleSave(payload);
    }
    this.setState({ value: 0 });
  }

  handleDelete = ({ target }) => {
    const { handleDelete } = this.props;
    handleDelete(target.id);
  }

  handleEdit = ({ target }) => {
    const { expenses } = this.props;
    this.setState({ buttonEdit: true });
    const expenseEdited = expenses
      .find((expense) => Number(expense.id) === Number(target.id));
    this.setState({
      value: expenseEdited.value,
      description: expenseEdited.description,
      currency: expenseEdited.currency,
      method: expenseEdited.method,
      tag: expenseEdited.tag,
      exchangeRates: expenseEdited.exchangeRates,
      id: expenseEdited.id,
    });
  }

  render() {
    const { currencies, expenses } = this.props;
    const { value, description, currency, method, tag, buttonEdit } = this.state;
    const table = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
      'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];
    return (
      <>
        <Header />
        <form>
          <label htmlFor="value-input">
            Valor:
            <input
              type="number"
              data-testid="value-input"
              id="value-input"
              name="value"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="description-input">
            Descrição:
            <input
              type="text"
              data-testid="description-input"
              id="description-input"
              name="description"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currency-input">
            Moeda:
            <select
              name="currency"
              id="currency-input"
              data-testid="currency-input"
              onChange={ this.handleChange }
              value={ currency }
            >
              {currencies && (currencies.map((moedas) => (
                <option
                  key={ moedas }
                  data-testid={ moedas }
                  value={ moedas }
                >
                  { moedas }
                </option>
              )))}
            </select>
          </label>
          <label htmlFor="method-input">
            Método de Pagamento:
            <select
              name="method"
              id="method-input"
              data-testid="method-input"
              onChange={ this.handleChange }
              value={ method }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag-input">
            Tag:
            <select
              name="tag"
              id="tag-input"
              data-testid="tag-input"
              onChange={ this.handleChange }
              value={ tag }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
            {buttonEdit
              ? <button type="submit" onClick={ this.handleClick }>Editar despesa</button>
              : (
                <button
                  type="submit"
                  onClick={ this.handleClick }
                >
                  Adicionar despesa
                </button>)}
          </label>
        </form>
        <table>
          <thead>
            <tr>
              {table.map((element) => (<th key={ element }>{element}</th>))}
            </tr>
          </thead>
          <tbody>
            {expenses.map((el) => (
              <tr key={ el.id }>
                <td>{el.description}</td>
                <td>{el.tag}</td>
                <td>{el.method}</td>
                <td>{Number(el.value).toFixed(2)}</td>
                <td>{el.exchangeRates[el.currency].name}</td>
                <td>{Number(el.exchangeRates[el.currency].ask).toFixed(2)}</td>
                <td>{(el.exchangeRates[el.currency].ask * el.value).toFixed(2)}</td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    id={ el.id }
                    onClick={ this.handleEdit }
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    id={ el.id }
                    onClick={ this.handleDelete }
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  handleClick: (coin) => {
    dispatch(saveCoin(coin));
  },
  handleSave: (state) => dispatch(saveExpense(state)),
  handleDelete: (id) => {
    dispatch(deleteState(id));
  },
  handleEdit: (state) => dispatch(editState(state)),
});

Wallet.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  handleClick: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
