import React from 'react';
import { Table, Button, NavLink } from 'reactstrap';

import { TNullable, TObject } from '../../types';
import './Grid.css';
import GridFooter from './GridFooter';
import GridCell from './GridCell';

interface IGrid<T> {
  header: string[];
  values: T[];
  actions?: {
    label: string;
    action: (key: T) => void;
  }[];
  footer?: TNullable<{
    label?: string;
    action?: any;
    isFetching?: boolean;
  }>;
}

export default function Grid<T>({
  header = [],
  values = [],
  actions = [],
  footer = null,
}: IGrid<T>) {
  const { label: footerLabel, action: footerAction, isFetching } = footer || {};

  return (
    <div className={`grid-container ${footer ? 'has-footer' : ''}`}>
      <Table>
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
            <tr key={index} className="grid-row">
              {header.map((columnName) => {
                const currentRow = (row as unknown) as TObject<string>;
                return (
                  <GridCell
                    key={columnName}
                    columnName={columnName}
                    row={currentRow}
                  />
                );
              })}
              {!!actions.length && (
                <td className="grid-cell">
                  <div className="grid-buttons">
                    {actions.map(({ label, action }) => (
                      <Button
                        key={label}
                        color="primary"
                        onClick={() => action(row)}
                        size="sm"
                        className="grid-button"
                      >
                        {label}
                      </Button>
                    ))}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
      <GridFooter
        label={footerLabel}
        action={footerAction}
        isFetching={isFetching || false}
      />
    </div>
  );
}
