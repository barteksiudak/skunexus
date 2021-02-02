import React from 'react';
import { shallow } from 'enzyme';
import { Button, Table } from 'reactstrap';

import Grid from './Grid';
import { TObject } from '../../types';

describe('Grid', () => {
  const getWrapper = (props?: {
    header: string[];
    values: TObject<string>[];
    actions?: any[];
  }) => {
    const { header = [], values = [], actions = [] } = props || {};
    return shallow(
      <Grid<TObject<string>>
        header={header}
        values={values}
        actions={actions}
      />
    );
  };

  const headerMock: string[] = ['first', 'second', 'third'];
  const rowsMock = [
    { first: 'first cell' },
    { second: 'second cell' },
    { third: 'third cell' },
  ] as TObject<string>[];

  it('is Grid', () => {
    expect(getWrapper().find(Table)).toHaveLength(1);
  });
  it('has correct length of headers', () => {
    const wrapper = getWrapper({ header: headerMock, values: rowsMock });
    expect(wrapper.find('th')).toHaveLength(3);
  });
  it('can call an action', () => {
    const actions = [
      { label: 'first', action: jest.fn() },
      { label: 'second', action: jest.fn() },
    ];
    const [{ action: firstAction }] = actions;
    const [firstMock] = rowsMock;

    const wrapper = getWrapper({
      header: headerMock,
      values: rowsMock,
      actions,
    });

    wrapper.find(Button).first().simulate('click', 'test');

    expect(firstAction).toHaveBeenCalledWith(firstMock);
  });
});
