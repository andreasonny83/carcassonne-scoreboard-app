import React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import { Auth } from '../components/Auth';
import { PrivateRouter } from '../components/PrivateRouter';
import { Main } from '../components/Main';
import { NotFound } from '../components/NotFound';

export const routes = (
  <Switch>
    <PrivateRouter path="/app" target={Main} redirectTo="/login" />
    <Route path="/404" component={NotFound} />
    <Route path="/login" component={Auth} />
    <Redirect to={'/app'} />
  </Switch>
);
