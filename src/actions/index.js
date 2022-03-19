export const SAVE_EMAIL = 'SAVE_EMAIL';
export const SAVE_COIN = 'SAVE_COIN';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';
export const DELETE_STATE = 'DELETE_STATE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';

export const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  email,
});

export const saveCoin = (coin) => ({
  type: SAVE_COIN,
  payload: coin,
});

export const saveExpense = (payload) => ({
  type: SAVE_EXPENSE,
  payload,
});

export const deleteState = (payload) => ({
  type: DELETE_STATE,
  payload,
});

export const editState = (payload) => ({
  type: EDIT_EXPENSE,
  payload,
});
