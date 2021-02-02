import React, { useCallback } from 'react';
import {
  Table,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavLink,
} from 'reactstrap';

import { TNullable, TObject } from '../../types';
import './Grid.css';
import GridFooter from './GridFooter';
import GridCell from './GridCell';

interface IGrid<T> {
  header: TObject<string>[];
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

  const handleActionClick = useCallback((action, row) => () => action(row), []);

  return (
    <div className={`grid-container ${footer ? 'has-footer' : ''}`}>
      <Table>
        <thead>
          <tr>
            {header.map(({ name: colName }) => (
              <th key={colName}>{colName}</th>
            ))}
            {!!actions.length && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {values.map((row, index) => (
            <tr key={index} className="grid-row">
              {header.map(({ name: columnName, type }) => {
                const currentRow = (row as unknown) as TObject<string>;
                return (
                  <GridCell
                    key={columnName}
                    columnName={columnName}
                    row={currentRow}
                    type={type}
                  />
                );
              })}
              {!!actions.length && (
                <td className="grid-cell">
                  <UncontrolledDropdown direction="left">
                    <DropdownToggle caret>Actions</DropdownToggle>
                    <DropdownMenu>
                      {actions.map(({ label, action }) => (
                        <DropdownItem key={label} header>
                          <NavLink onClick={handleActionClick(action, row)}>
                            {label}
                          </NavLink>
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </UncontrolledDropdown>
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
