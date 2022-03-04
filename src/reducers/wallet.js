// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { SAVE_STATE } from '../actions';
// import user from './user';
// import wallet from './wallet';

const STATE_INICIAL = {
  currencies: [],
  expenses: [],
};

const wallet = (state = STATE_INICIAL, action) => {
  switch (action.type) {
  case SAVE_STATE:
    return {
      ...state,
      expenses: [...state.expenses, action.state],
    };
  default:
    return state;
  }
};

export default wallet;
