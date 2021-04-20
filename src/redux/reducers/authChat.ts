interface Message {
  type: '';
  text: '';
  createdAt: {};
}

// export interface AuthChat {
//   messages: Message[];
// }

const initialState = {
  name: '',
  email: '',
  messages: <Array<Message>>[],
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case 'AUTH_CHAT_MESSAGES_ADD': {
      state.messages = [...state.messages, ...[action.payload]];
      return state;
    }
    case 'AUTH_CHAT_ADD': {
      return {...state, ...action.payload};
    }
    case 'AUTH_CHAT_EMAIL_DEL': {
      state.email = '';
      return state;
    }
    case 'AUTH_CHAT_MESSAGES_RESET': {
      state.messages = [];
      return state;
    }
    case 'AUTH_CHAT_RESET': {
      state = {
        name: '',
        email: '',
        messages: <Array<Message>>[],
      };
      // console.log('AUTH_CHAT_RESET', state);
      return state;
    }

    default:
      return state;
  }
}
