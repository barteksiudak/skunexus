import { Dispatch } from 'react';

export type TObject<T> = {
  [key: string]: T;
};
export type TNullable<T> = T | null;
export type TDispatch<T> = Dispatch<TObject<string | T>>;
