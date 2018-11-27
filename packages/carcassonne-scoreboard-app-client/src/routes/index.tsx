import React, { PureComponent } from 'react';
import { Switch, Route, Redirect } from 'react-router';

import { LogIn, HomePage } from '../connected';
import { connect } from 'react-redux';

interface PrivateRouterImplProps {
  childrens: any;
}

class PrivateRouterImpl extends PureComponent<any, PrivateRouterImplProps> {
  public render() {
    const { children, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={props =>
          localStorage.getItem('user') ? (
            <children {...props} />
          ) : (
            <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
          )
        }
      />
    );
  }
}

const mapStateToProps = (state: any) => ({
  state: state.cognito.state,
  user: state.cognito.user,
  attributes: state.cognito.attributes,
});

export const PrivateRouter = connect(
  mapStateToProps,
  null
)(PrivateRouterImpl);

export const routes = (
  <Switch>
    <PrivateRouter exact={true} path="/" component={HomePage} />
    <Route path="/login" component={LogIn} />
  </Switch>
);
