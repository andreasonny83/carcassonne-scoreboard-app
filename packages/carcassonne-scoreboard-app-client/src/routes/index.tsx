import React from 'react';
import { Switch, Route } from 'react-router';

import { Homepage } from '../connected/HomepageConnected';
import { CodeConfirmation } from '../connected/CodeConfirmation';

export const routes = (
  <Switch>
    <Route exact={true} path="/" component={Homepage} />
    <Route path="/code-confirmation" component={CodeConfirmation} />
  </Switch>
);
