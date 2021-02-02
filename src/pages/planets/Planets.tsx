import { History } from 'history';
import { useParams } from 'react-router-dom';
import { Planets as PlanetsComponent } from '../../components';

interface IPlanets {
  history: History;
}

export default function Planets({ history }: IPlanets) {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <PlanetsComponent />;
  }

  return <PlanetsComponent />;
}
