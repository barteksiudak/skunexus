import { useEffect, useState } from 'react';
import queryString from 'query-string';

import config from '../../config.json';
import { Grid } from '../../components';
import { http } from '../../compositions';
import { TNullable, TTableData } from '../../types';

interface IAvailableDataGrid {
  search: string;
  name: string;
}

export default function AvailableDataGrid<T>({
  search,
  name,
}: IAvailableDataGrid) {
  const [items, setItems] = useState<TNullable<T[]>>(null);

  const {
    GRID_CONFIG: {
      [name]: { path, header },
    },
  } = (config as unknown) as TTableData;

  useEffect(() => {
    const { ids: idsRaw } = queryString.parse(search);
    const idsString = String(idsRaw);
    let ids: string[] = [];

    try {
      ids = JSON.parse(idsString);
    } catch (e) {}

    if (!Array.isArray(ids)) {
      setItems([]);
      return;
    }

    Promise.all(ids.map((id) => http.get(`${path}/${id}`))).then((data) => {
      const list = data.map(({ data }) => data);
      console.log(list);
      setItems(list);
    });
  }, [search, path]);

  if (items !== null && !items.length) {
    return <h2>No data to display</h2>;
  }

  return (
    <Grid<T>
      header={header}
      values={items || []}
      footer={{ isFetching: items === null }}
    />
  );
}
