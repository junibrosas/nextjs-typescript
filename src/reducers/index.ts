import { combineReducers } from "redux";
import { userReducer, IUserState } from './user.reducer';

export interface IMainState {
  user: IUserState
}

const appReducer = combineReducers({
  user: userReducer
});

export default (state, action) => {
  return appReducer(state, action);
}