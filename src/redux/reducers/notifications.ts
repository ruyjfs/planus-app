import _ from 'lodash';

const initialState = {
  all: {},
  order: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'NOTIFICATIONS_ADD': {
      state.all = {...state.all, ...action.values};
      return state;
    }
    default:
      return state;
  }
}
