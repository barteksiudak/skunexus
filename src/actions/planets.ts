import { http } from '../compositions';
import { IPlanet, TDispatch, TNullable, TObject } from '../types';
import { BASE_URL } from '../config.json';

interface ISaveData {
  name: string;
  value: string;
}

export const receivePlanets = () => ({
  type: 'RECEIVE_PLANETS',
});

export const savePlanet = (
  planetName: string,
  planetData: TObject<string>
) => ({
  type: 'SAVE_PLANET',
  planetData,
  planetName,
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

export const savePlanetAction = (
  planetName: string,
  planetData: ISaveData[]
) => (dispatch: TDispatch<TObject<string>>) => {
  const data = planetData.reduce(
    (
      acc: TObject<string>,
      { name, value }: { name: string; value: string }
    ) => {
      return {
        ...acc,
        [name]: value,
      };
    },
    {}
  );

  dispatch(savePlanet(planetName, data));
};
