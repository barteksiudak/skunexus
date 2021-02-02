import { History } from 'history';

import { AvailableDataGrid } from '../../components';

interface IResident {
  history: History;
}

export default function Films({ history }: IResident) {
  return <AvailableDataGrid name="films" search={history.location.search} />;
}
