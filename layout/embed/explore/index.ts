// Redux
import { connect } from 'react-redux';
import * as actions from 'layout/explore/actions';
import * as reducers from 'layout/explore/reducers';
import initialState from 'layout/explore/initial-state';

import ExploreEmbedComponent from './component';

// Mandatory
export { actions, reducers, initialState };

export default connect(
  () => ({}),
  actions,
)(ExploreEmbedComponent);
