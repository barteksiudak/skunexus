import React from 'react';
import { Spinner, Breadcrumb, BreadcrumbItem } from 'reactstrap';

import './GridFooter.css';

interface IGridFooter {
  action?: any;
  label?: string;
  isFetching: boolean;
}

export default function GridFooter({
  label,
  action,
  isFetching = false,
}: IGridFooter) {
  if (isFetching) {
    return (
      <Breadcrumb className="grid-footer" tag="nav" listTag="div">
        <BreadcrumbItem tag="div">
          <Spinner />
        </BreadcrumbItem>
      </Breadcrumb>
    );
  }

  if (!label || !action) {
    return null;
  }

  return (
    <Breadcrumb className="grid-footer" tag="nav" listTag="div">
      <BreadcrumbItem tag="a" onClick={action}>
        {label}
      </BreadcrumbItem>
    </Breadcrumb>
  );
}
