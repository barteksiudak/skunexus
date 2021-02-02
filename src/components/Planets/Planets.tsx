import { useHistory } from 'react-router-dom';

import { Grid } from '../../components';
import { useCallback, useEffect, useMemo } from 'react';
import { IPlanet, TNullable } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { getPlanetsAction } from '../../actions';
import { getIdFromLink } from '../../compositions';

const HEADER = [
  'name',
  'rotation_period',
  'orbital_period',
  'diameter',
  'climate',
  'gravity',
  'terrain',
  'surface_water',
  'population',
];

interface IState {
  planets: {
    next: TNullable<string>;
    isFetching: boolean;
    planets: IPlanet[];
  };
}

export default function Planets() {
  const dispatch = useDispatch();
  const { next, planets, isFetching } = useSelector(
    (state: IState) => state.planets
  );

  const getPlanets = useCallback(() => {
    dispatch(getPlanetsAction(next));
  }, [dispatch, next]);

  const history = useHistory();

  useEffect(() => {
    if (!planets.length) {
      getPlanets();
    }
  }, [planets, dispatch, getPlanets]);

  const footerProps = useMemo(
    () => ({
      isFetching,
      label: 'Load more',
      action: getPlanets,
    }),
    [getPlanets, isFetching]
  );

  const goTo = useCallback(
    (pathname: string, links: string[]) => {
      const ids = links.map(getIdFromLink).filter(Boolean);
      history.push({
        pathname,
        search: `?ids=${encodeURIComponent(JSON.stringify(ids))}`,
      });
    },
    [history]
  );

  const ACTIONS = useMemo(
    () => [
      {
        label: 'Go to Films',
        action: ({ films }: IPlanet) => {
          goTo('/films', films);
        },
      },
      {
        label: 'Go to Residents',
        action: ({ residents }: IPlanet) => {
          goTo('/residents', residents);
        },
      },
    ],
    [goTo]
  );

  return (
    <div className="App">
      <Grid<IPlanet>
        header={HEADER}
        values={planets}
        actions={ACTIONS}
        footer={next !== null ? footerProps : null}
      />
    </div>
  );
}
