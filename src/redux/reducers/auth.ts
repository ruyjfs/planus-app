const initialState = {
  id: '',
  uid: '',
  email: '',
  phone: '',
  username: '',
  name: '',
  lastName: '',
  showTutorial: true,
  tokenFcm: '',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'AUTH_ADD': {
      return {...state, ...action.payload};
    }
    case 'AUTH_RESET': {
      // console.log('RESETOU - AUTH_RESET', initialState);
      state = initialState;
      return state;
    }
    default:
      return state;
  }
}
