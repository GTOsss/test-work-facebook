import {
  GET_USER_SUCCESS,
  GET_LOGIN_STATUS,
  INIT,
  LOAD_ANSWERS_SUCCESS,
} from '../constans';

const initialState = {
  name: '',
  loginStatus: {},
  init: {},
  answers: [],
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case GET_USER_SUCCESS:
      return { ...state, ...action.user };
    case GET_LOGIN_STATUS:
      return { ...state, loginStatus: action.loginStatus };
    case INIT:
      return { ...state, init: action.init };
    case LOAD_ANSWERS_SUCCESS:
      return { ...state, answers: action.answers };
    default:
      return state;
  }
}
