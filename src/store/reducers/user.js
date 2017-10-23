
const initialState = {

};

export default function user(state = initialState, action) {
  switch (action.type) {
    case 'test':
      return { ...state };
    default:
      return state;
  }
}
