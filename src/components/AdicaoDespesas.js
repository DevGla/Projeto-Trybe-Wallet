import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { deleteState, saveState } from '../actions';
import requisicaoAPI from './requisicao';
import Header from './Header';

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
      some: 0,
      exchangeRates: '',
      arrayRequiso8: '',
      id: 0,
      buttonEdit: false,
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
    this.setState({ [id]: value });
  };

  /* função usada para transformar o state em uma constante e enviar para a action atualizar a store com o estado(state) e a soma feita na função acima */
  handleExpense = () => {
    const { handleClick } = this.props;
    const {
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates,
      some,
      id,
    } = this.state;
    const expense = { value, currency, method, tag, description, exchangeRates, id };
    console.log(some);
    handleClick(expense, some);
  }

  /* função chamada após o click do botão Adicionar despesas. Faz uma requisição para popular o state local(exchangesRates), chama a função de soma, atualiza o ,  */
  saveAndDispatch = async () => {
    await requisicaoAPI().then((data) => {
      const list = Object.entries(data);
      const { currency } = this.state;
      const arrays = list.filter(([key]) => key === currency)
        .map(([, valueAsk]) => valueAsk);
      this.setState((prevState) => ({
        arrayRequiso8: [...prevState.arrayRequiso8, arrays],
        exchangeRates: data,
      }), this.rodsFunction);
      /* const totalAsk = list.filter(([key]) => key === currency)
        .map(([, valueAsk]) => valueAsk.ask); */
      /* const multMoeda = Number(totalAsk) * Number(value).toFixed(2);
      console.log(multMoeda);
      const somaFinal = (Number(multMoeda) + Number(some)).toFixed(2);
      console.log(somaFinal);
      this.setState((prevState) => ({
        exchangeRates: data,
        some: somaFinal,
        id: prevState.id + 1,
      }), this.handleExpense); */
    });
    this.setState({
      value: 0,
      description: '',
      currency: 'USD',
      method: '',
      tag: '',
    });
  }

  rodsFunction = () => {
    const { arrayRequiso8, some, value } = this.state;
    console.log(arrayRequiso8);
    // usar reducer aqui embaixo
    const totalAsk = arrayRequiso8.map((key) => key.map((key2) => key2.ask));
    console.log(totalAsk, 'q');
    const multMoeda = Number(totalAsk) * Number(value);
    const somaFinal = Number(multMoeda) + Number(some);
    console.log(some);
    console.log(somaFinal.toFixed(2));
    this.setState((prevState) => ({
      some: Number((prevState.some) + somaFinal).toFixed(2),
      id: prevState.id + 1,
    }), this.handleExpense);
  };

  /* funçõa que é chamada após o click no botão "deletar despesas". Quando o click é feito, acontece uma leitura da Store, depois acontece um filtro na store para termos acesso ao objeto com as informações através do id do target clicado, depois acesso o valor ask desse objeto e multiplico esse ask pelo valor digitado, depois diminuo pelo valor da soma do state, chamo a action para atualilzar a store e limpar esse elemento(target) tirando o mesmo da tela renderizando o que sobra na store e depois  atualizo o valor da soma mostrado na tela.  */
  deleteDespesa = ({ target }) => {
    const { stateWallet: { expenses, soma }, handleDelete } = this.props;
    console.log(expenses);
    console.log(soma);
    const newTarget = expenses
      .find((deleted) => Number(deleted.id) === Number(target.id));
    const valorMult = (
      Number(newTarget.exchangeRates[newTarget.currency].ask) * Number(newTarget.value)
    ).toFixed(2);
    const valorDiminuido = (soma - valorMult).toFixed(2);
    console.log(valorDiminuido);
    handleDelete(newTarget.id, Number(valorDiminuido));
  }

  /* editarDespesa = ({ target }) => {
    const targetId = target.id;
    const { stateWallet: { expenses } } = this.props;
    console.log(expenses);
    const elementoClicado = expenses
      .find((element) => element.id === 2);
    console.log(elementoClicado);
    const elementoClicadoTarget = expenses
      .find((element) => element.id === targetId); */
  /* this.setState({
      value: elementoClicado.value,
      description: elementoClicado.description,
      currency: elementoClicado.currency,
      method: elementoClicado.method,
      tag: elementoClicado.tag,
      buttonEdit: true,
    }); */
  // handleClick(this.state, some);
  /* } */

  render() {
    const { value,
      description,
      currency,
      method,
      tag,
      coins,
      buttonEdit } = this.state;
    const { handleClick, stateWallet } = this.props;
    return (
      <div>
        <Header />
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
          {buttonEdit ? (
            <button
              type="button"
              onClick={ () => this.editarDespesa }
            >
              Editar Despesas
            </button>
          ) : (
            <button
              type="button"
              onClick={ () => this.saveAndDispatch(handleClick) }
            >
              Adicionar Despesas
            </button>
          )}
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
            { stateWallet.expenses && stateWallet.expenses.map((expense) => (
              <div key={ expense.id } id={ expense.id }>
                <tr id={ expense.id }>
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
                  <th>
                    <button
                      type="button"
                      data-testid="edit-btn"
                      onClick={ this.editarDespesa }
                      id={ expense.id }
                    >
                      Editar despesa
                    </button>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ this.deleteDespesa }
                      id={ expense.id }
                    >
                      Deletar
                    </button>
                  </th>
                </tr>
              </div>
            )) }
          </tbody>
        </table>
      </div>
    );
  }
}

/* ({ target }) => {
  const { stateWallet: { expenses, soma }, handleDelete } = this.props;
  console.log(expenses);
  console.log(soma);
  const newTarget = expenses
    .find((deleted) => Number(deleted.id) === Number(target.id));
  const valorMult = (
    Number(newTarget.exchangeRates[newTarget.currency].ask) * Number(newTarget.value)
  ).toFixed(2);
  const valorDiminuido = soma - valorMult;
  console.log(valorDiminuido);
  handleDelete(newTarget.id, valorDiminuido);
                      } } */

const mapDispatchToProps = (dispatch) => (
  {
    handleClick: (state, some) => {
      dispatch(saveState(state, some));
    },
    handleDelete: (id, soma) => {
      dispatch(deleteState(id, soma));
    },
  });

const mapStateToProps = (state) => ({
  stateUser: state.user,
  stateWallet: state.wallet,
});

AdicaoDespesas.propTypes = {
  handleClick: PropTypes.func.isRequired,
  stateWallet: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdicaoDespesas);
