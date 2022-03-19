import { SAVE_COIN, SAVE_EXPENSE, DELETE_STATE, EDIT_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, { payload, type }) => {
  switch (type) {
  case SAVE_COIN:
    return {
      ...state,
      currencies: Object.values(payload),
    };
  case SAVE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, payload],
    };
  case DELETE_STATE:
    return {
      ...state,
      expenses: state.expenses.filter((el) => Number(el.id) !== Number(payload)),
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      expenses: payload,
    };
  default:
    return state;
  }
};

export default wallet;
