import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

export class NotFound extends PureComponent {
  public render(): JSX.Element {
    return (
      <div className="NotFound">
        <h2>Page not found</h2>

        <Link to="/">Back to Homepage</Link>
      </div>
    );
  }
}
