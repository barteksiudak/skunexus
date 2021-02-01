import { TObject } from '../../types';
import './Grid.css';

interface IGrid<T> {
  header: string[];
  values: T[];
  actions: {
    label: string;
    action: (key: T) => void;
  }[];
}

export default function Grid<T>({
  header = [],
  values = [],
  actions = [],
}: IGrid<T>) {
  return (
    <table className="gridTable">
      <thead>
        <tr>
          {header.map((colName) => (
            <th key={colName}>{colName}</th>
          ))}
          {!!actions.length && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {values.map((row, index) => (
          <tr key={index}>
            {header.map((colName) => {
              const currentRow = (row as unknown) as TObject<string>;
              return <td key={colName}>{currentRow[colName]}</td>;
            })}
            {!!actions.length && (
              <td className="gridActions">
                {actions.map(({ label, action }) => (
                  <button key={label} onClick={() => action(row)}>
                    {label}
                  </button>
                ))}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
