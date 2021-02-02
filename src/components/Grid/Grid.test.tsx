import React from 'react';
import { mount } from 'enzyme';
import { NavLink, Table } from 'reactstrap';

import Grid from './Grid';
import { TObject } from '../../types';

describe('Grid', () => {
  const getWrapper = (props?: {
    header: { name: string }[];
    values: TObject<string>[];
    actions?: any[];
  }) => {
    const { header = [], values = [], actions = [] } = props || {};
    return mount(
      <Grid<TObject<string>>
        header={header}
        values={values}
        actions={actions}
      />
    );
  };

  const headerMock = [{ name: 'first' }, { name: 'second' }, { name: 'third' }];
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

    wrapper.find(NavLink).first().simulate('click', 'test');

    expect(firstAction).toHaveBeenCalledWith(firstMock);
  });
});
