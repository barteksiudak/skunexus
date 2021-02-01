import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Planets } from '../pages';
import NotFoundPage from '../components/NotFoundPage';

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Planets} />
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
}
