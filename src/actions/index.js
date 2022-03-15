// Coloque aqui suas actions
export const SAVE_EMAIL = 'SAVE_EMAIL';
export const SAVE_STATE = 'SAVE_STATE';
export const DELETE_STATE = 'DELETE_STATE';

export const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  email,
});

export const saveState = (state, soma) => ({
  type: SAVE_STATE,
  payload: state,
  soma,
});

export const deleteState = (id, soma) => ({
  type: DELETE_STATE,
  id,
  soma,
});
