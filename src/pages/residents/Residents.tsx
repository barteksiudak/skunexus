import { History } from 'history';

import { AvailableDataGrid } from '../../components';

interface IResident {
  history: History;
}

export default function Residents({ history }: IResident) {
  return (
    <AvailableDataGrid name="residents" search={history.location.search} />
  );
}
