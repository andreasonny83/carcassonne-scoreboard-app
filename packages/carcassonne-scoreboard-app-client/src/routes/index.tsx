import React from 'react';
import { Switch, Route } from 'react-router';

import { AuthPage, HomePage, PrivateRouter } from '../containers';
import { NotFound } from '../components/NotFound';

export const routes = (
  <Switch>
    <PrivateRouter path="/" exact={true} target={HomePage} redirectTo="/login" />
    <Route path="/login" component={AuthPage} />
    <Route component={NotFound} />
  </Switch>
);
