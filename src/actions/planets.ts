import { http } from '../compositions';
import { IPlanet, TDispatch } from '../types';

export const receivePlanets = () => ({
  type: 'RECEIVE_PLANETS',
});

export const receivePlanetsSuccess = (planets: IPlanet[]) => ({
  type: 'RECEIVE_PLANETS_SUCCESS',
  planets,
});

export const getPlanetsAction = (page: number = 1) => (
  dispatch: TDispatch<IPlanet[]>
) => {
  dispatch(receivePlanets());
  http.get(`planets?page=${page}`).then(({ data }) => {
    dispatch(receivePlanetsSuccess(data));
  });
};
