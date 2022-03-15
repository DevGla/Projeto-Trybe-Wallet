// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { SAVE_STATE, DELETE_STATE } from '../actions';
// import user from './user';
// import wallet from './wallet';

const STATE_INICIAL = {
  currencies: [],
  expenses: [],
  id: -1,
  soma: 0,
};

const wallet = (state = STATE_INICIAL, action) => {
  switch (action.type) {
  case SAVE_STATE:
    return {
      ...state,
      id: state.id + 1,
      soma: action.soma,
      expenses: [
        ...state.expenses,
        {
          ...action.payload,
          id: state.id + 1,
        },
      ],
    };
  case DELETE_STATE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.id),
      soma: action.soma,
    };
  default:
    return state;
  }
};

export default wallet;
