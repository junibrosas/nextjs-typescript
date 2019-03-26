import { combineReducers } from "redux";

interface IDefaultState {
  name: string;
  confirm: boolean;
}

const getDefaultState = (): IDefaultState => ({
  name: 'John Doe',
  confirm: false
});

export const user = (state, action) => {
  
  if (state === undefined) {
    state = getDefaultState();
  }

  switch(action.type) {
    case 'user:toggle_shake_hands':
      return Object.assign({}, state, { confirm: action.payload });

    default:
      return state;
  }
}

const appReducer = combineReducers({
  user: user
});

export default (state, action) => {
  return appReducer(state, action);
}