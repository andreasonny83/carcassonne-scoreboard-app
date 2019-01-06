import React from 'react';
import { Switch, Route } from 'react-router';

import { Auth } from '../components/Auth';
import { PrivateRouter } from '../components/PrivateRouter';
import { Main } from '../components/Main';
import { NotFound } from '../components/NotFound';

export const routes = (
  <Switch>
    <PrivateRouter path="/" exact={true} target={Main} redirectTo="/login" />
    <Route path="/login" component={Auth} />
    <Route component={NotFound} />
  </Switch>
);
