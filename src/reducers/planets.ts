import { IPlanet, TNullable, TPlanets } from '../types';

interface IState {
  planets: TPlanets;
  isFetching: boolean;
  errorMessage: TNullable<string>;
}

interface IPayload {
  type: string;
  planets: IPlanet[];
  errorMessage: TNullable<string>;
}

const initialState: IState = {
  planets: new Map(),
  isFetching: false,
  errorMessage: null,
};

export default function planets(
  state: IState = initialState,
  payload: IPayload
) {
  const { type } = payload;

  switch (type) {
    case 'RECEIVE_PLANETS': {
      return { ...state, isFetching: true };
    }
    case 'RECEIVE_PLANETS_SUCCESS': {
      const { planets } = payload;
      return { ...state, planets, isFetching: false };
    }
    case 'SAVE_PLANETS_ERROR': {
      const { errorMessage } = payload;
      return { ...state, isFetching: false, errorMessage };
    }

    default:
      return state;
  }
}
