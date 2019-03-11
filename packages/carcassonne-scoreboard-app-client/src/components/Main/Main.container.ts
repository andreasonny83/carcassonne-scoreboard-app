import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { showNotification } from '../../actions';
import { MainComponent } from './Main';

const mapDispatchToProps = {
  showNotification,
};

export const Main = withRouter(
  connect(
    null,
    mapDispatchToProps
  )(MainComponent)
);
