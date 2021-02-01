import './Planets.css';

import { http } from '../../compositions';

import { Grid } from '../../components';
import { useEffect, useState } from 'react';
import { IPlanet } from '../../types';

type TPlanetsResponse = {
  next: string;
  previous: string;
  results: IPlanet[];
};

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

const ACTIONS = [
  {
    label: 'Go to Films',
    action: (row: IPlanet) => {
      console.log(`redirect to grid with ${row.films.length} Films`);
    },
  },
  {
    label: 'Go to Residents',
    action: (row: IPlanet) => {
      console.log(`redirect to grid with ${row.residents.length} Residents`);
    },
  },
];

function Planets() {
  const [planets, setPlanets] = useState<IPlanet[]>([]);

  useEffect(() => {
    http
      .get<TPlanetsResponse>('/planets')
      .then(({ data: { previous, next, results } }) => {
        setPlanets(results);
      });
  }, []);

  return (
    <div className="App">
      <Grid<IPlanet> header={HEADER} values={planets} actions={ACTIONS} />
    </div>
  );
}

export default Planets;
