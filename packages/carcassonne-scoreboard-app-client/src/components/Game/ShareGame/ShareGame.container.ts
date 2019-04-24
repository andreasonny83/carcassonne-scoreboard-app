import { connect } from 'react-redux';

import { showNotification } from '../../../actions';
import { ShareGameWithStyles } from './ShareGameWithStyles';

const mapDispatchToProps = { showNotification };

export const ShareGame = connect(
  null,
  mapDispatchToProps
)(ShareGameWithStyles);
