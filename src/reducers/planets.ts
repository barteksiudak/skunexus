import { IPlanet, TNullable } from '../types';

interface IState {
  total: TNullable<number>;
  planets: IPlanet[];
  next: TNullable<string>;
  pageSize: TNullable<number>;
  isFetching: boolean;
  errorMessage: TNullable<string>;
}

interface IPayload {
  type: string;
  total: number;
  next: TNullable<string>;
  planets: IPlanet[];
  errorMessage: TNullable<string>;
  planetData: IPlanet;
  planetName: string;
}

const initialState: IState = {
  total: null,
  planets: [],
  next: '',
  pageSize: null,
  isFetching: false,
  errorMessage: null,
};

export default function planetsReducer(
  state: IState = initialState,
  payload: IPayload
) {
  const { type } = payload;

  switch (type) {
    case 'RECEIVE_PLANETS': {
      return { ...state, isFetching: true };
    }
    case 'RECEIVE_PLANETS_SUCCESS': {
      const { planets, total, next } = payload;
      const { pageSize: pageSizeState, planets: planetsState } = state;
      const pageSize = !planets.length ? planets.length : pageSizeState;

      return {
        ...state,
        next,
        planets: [...planetsState, ...planets],
        isFetching: false,
        total,
        pageSize,
      };
    }
    case 'RECEIVE_PLANETS_ERROR': {
      const { errorMessage } = payload;
      return { ...state, isFetching: false, errorMessage };
    }

    case 'SAVE_PLANET': {
      const { planetName, planetData } = payload;
      const { planets: planetsState } = state;
      const planet = planetsState.find(({ name }) => name === planetName);
      const planetIndex = planetsState.indexOf(planet as IPlanet);

      const planets = [...planetsState];
      planets.splice(planetIndex, 1, { ...planet, ...planetData });

      return { ...state, planets };
    }

    default:
      return state;
  }
}
