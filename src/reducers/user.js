// Esse reducer será responsável por tratar as informações da pessoa usuária
import { SAVE_EMAIL } from '../actions';
// import user from './user';
// import wallet from './wallet';

const STATE_INICIAL = {
  email: '',
};

const user = (state = STATE_INICIAL, action) => {
  switch (action.type) {
  case SAVE_EMAIL:
    return {
      email: action.email,
    };
  default:
    return state;
  }
};

export default user;
