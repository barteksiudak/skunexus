import { http } from '../compositions';
import { IPlanet, TDispatch, TNullable } from '../types';
import { BASE_URL } from '../config.json';

export const receivePlanets = () => ({
  type: 'RECEIVE_PLANETS',
});

export const receivePlanetsSuccess = (
  planets: IPlanet[],
  total: number,
  next: string
) => ({
  type: 'RECEIVE_PLANETS_SUCCESS',
  planets,
  total,
  next,
});

export const getPlanetsAction = (nextPage: TNullable<string> = null) => (
  dispatch: TDispatch<IPlanet[] | number>
) => {
  dispatch(receivePlanets());

  return http
    .get(nextPage ? nextPage.replace(BASE_URL, '') : `/planets`)
    .then(({ data: { results, next, count } }) => {
      dispatch(receivePlanetsSuccess(results, count, next));
    });
};
