// Coloque aqui suas actions
export const SAVE_EMAIL = 'SAVE_EMAIL';
export const SAVE_STATE = 'SAVE_STATE';
export const NEW_STATE = 'NEW_STATE';

export const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  email,
});

export const saveState = (state, soma) => ({
  type: SAVE_STATE,
  payload: state,
  soma,
});

/* export const newState = (newState, soma) => ({
  type: NEW_STATE,
  payload: newState,
  soma,
}); */
