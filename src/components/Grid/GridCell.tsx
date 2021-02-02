import { NavLink } from 'reactstrap';
import { getDataFromLink } from '../../compositions';

import { TObject } from '../../types';

interface IGridCell {
  columnName: string;
  row: TObject<string>;
}

export default function GridCell({ row, columnName }: IGridCell) {
  const currentRow = (row as unknown) as TObject<string>;
  const { [columnName]: value } = currentRow;
  const { path, id } = getDataFromLink(String(value));

  return (
    <td className="grid-cell" key={columnName}>
      {path && id ? (
        <NavLink href={`/${path}/${id}`}>Show &raquo;</NavLink>
      ) : (
        value
      )}
    </td>
  );
}
