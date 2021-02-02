import { useHistory } from 'react-router-dom';

import EditPlanetModal from './EditPlanetModal';
import { Grid } from '../../components';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { IPlanet, TNullable, TTableData } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { getPlanetsAction, savePlanetAction } from '../../actions';
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
  const [editingPlanetName, setEditingPlanetName] = useState<TNullable<string>>(
    null
  );
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

  const handleCloseEditPlanetModal = useCallback(() => {
    setEditingPlanetName(null);
  }, []);

  const handleSavePlanet = useCallback(
    (planetName, data) => {
      const currentPlanet = planets.find(({ name }) => planetName === name);

      if (!currentPlanet) {
        return;
      }

      dispatch(savePlanetAction(planetName, data));
    },
    [planets, dispatch]
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
      {
        label: 'Edit planet',
        action: ({ name }: IPlanet) => {
          setEditingPlanetName(name);
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
      <EditPlanetModal
        editingPlanetName={editingPlanetName}
        close={handleCloseEditPlanetModal}
        onSave={handleSavePlanet}
      />
      <Grid<IPlanet>
        header={header}
        values={planets}
        actions={ACTIONS}
        footer={next !== null ? footerProps : null}
      />
    </div>
  );
}
