export interface IUserState {
  name: string;
  confirm: boolean;
}

const getDefaultState = (): IUserState => ({
  name: 'John Doe',
  confirm: false
});

export const userReducer = (state: IUserState, action): IUserState => {
  
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
