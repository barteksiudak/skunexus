export interface IMessageReducerState {
  color: string;
  message: string;
}

interface IPayload {
  type: string;
  color: string;
  message: string;
}

const initialState: IMessageReducerState = {
  color: 'primary',
  message: '',
};

export default function messageReducer(
  state: IMessageReducerState = initialState,
  payload: IPayload
) {
  const { type } = payload;

  switch (type) {
    case 'SET_MESSAGE': {
      const { message, color = 'primary' } = payload;

      return {
        ...state,
        message,
        color,
      };
    }
    case 'REMOVE_MESSAGE': {
      return {
        ...state,
        message: '',
        color: 'primary',
      };
    }

    default:
      return state;
  }
}
