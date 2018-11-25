import React, { PureComponent } from 'react';

import { RegistrationForm } from './RegistrationForm';

export class HomepageComponent extends PureComponent<{}, {}> {
  public render() {
    return <RegistrationForm onRegistration={this.handleRegistration} />;
  }

  private handleRegistration = (email: string) => {
    //
  };
}
