import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Films, Planets, Residents, NotFoundPage } from '../pages';

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Planets} />
        <Route exact path="/planets/:id" component={Planets} />
        <Route exact path="/residents" component={Residents} />
        <Route exact path="/films" component={Films} />
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
}
