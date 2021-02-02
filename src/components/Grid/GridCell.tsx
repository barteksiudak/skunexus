import { NavLink } from 'reactstrap';
import { getDataFromLink } from '../../compositions';

import { TObject } from '../../types';

interface IGridCell {
  columnName: string;
  row: TObject<string>;
  type: string;
}

export default function GridCell({
  row,
  columnName,
  type = 'string',
}: IGridCell) {
  const currentRow = (row as unknown) as TObject<string>;
  const { [columnName]: value } = currentRow;
  const { path, id } = getDataFromLink(String(value));

  return (
    <td
      className={`grid-cell ${
        ['number', 'array'].includes(type) ? 'align-right' : ''
      }`}
      key={columnName}
    >
      {type !== 'array' && path && id ? (
        <NavLink href={`/${path}/${id}`}>Show &raquo;</NavLink>
      ) : type === 'array' ? (
        value.length
      ) : (
        value
      )}
    </td>
  );
}
