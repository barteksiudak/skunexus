import { useEffect, useState } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

import config from '../../config.json';
import { http } from '../../compositions';
import { TNullable, TObject, TTableData } from '../../types';

interface IPlanet {
  id: string;
}

export default function Planet({ id }: IPlanet) {
  const [data, setData] = useState<TNullable<IPlanet>>(null);

  useEffect(() => {
    http.get(`/planets/${id}`).then(({ data }) => {
      setData(data);
    });
  }, [id]);

  if (data === null) {
    return null;
  }

  const {
    GRID_CONFIG: {
      planet: { header },
    },
  } = (config as unknown) as TTableData;

  const dataList = (data as unknown) as TObject<string>;

  return (
    <ListGroup flush>
      {header.map((item) => {
        return (
          <ListGroupItem key={item}>
            {item}: <h5>{dataList[item]}</h5>
          </ListGroupItem>
        );
      })}
    </ListGroup>
  );
}
