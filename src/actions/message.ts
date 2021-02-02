import { TDispatch } from '../types';

export const setMessage = (message: string, color?: string) => ({
  type: 'SET_MESSAGE',
  message,
  color,
});

export const removeMessage = () => ({
  type: 'SET_MESSAGE',
});

export const setMessageAction = (message: string, color?: string) => (
  dispatch: TDispatch<string | undefined>
) => {
  dispatch(setMessage(message, color));

  setTimeout(() => {
    dispatch(removeMessage());
  }, 5000);
};
