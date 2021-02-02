import { useHistory } from 'react-router-dom';

import { Grid } from '../../components';
import { useCallback, useEffect, useMemo } from 'react';
import { IPlanet, TNullable, TTableData } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { getPlanetsAction } from '../../actions';
import { getIdFromLink } from '../../compositions';
import config from '../../config.json';

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
    (pathname: string, links?: string[]) => {
      if (!links) {
        history.push({
          pathname,
        });
        return;
      }

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
      {
        label: 'Show details',
        action: ({ url }: IPlanet) => {
          const planetId = getIdFromLink(url);
          goTo(`/planets/${planetId}`);
        },
      },
    ],
    [goTo]
  );

  const {
    GRID_CONFIG: {
      planet: { header },
    },
  } = (config as unknown) as TTableData;

  return (
    <div className="App">
      <Grid<IPlanet>
        header={header}
        values={planets}
        actions={ACTIONS}
        footer={next !== null ? footerProps : null}
      />
    </div>
  );
}
