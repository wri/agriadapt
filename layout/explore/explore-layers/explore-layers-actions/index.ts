import { connect } from 'react-redux';

// actions
import * as actions from 'layout/explore/actions';

// component
import ExploreDatasetsActions from './component';
import { RootState } from 'lib/store';

export default connect(
  (state: RootState) => ({
    ...state.explore.map,
    // user: state.user,
    selectedCollection: state.explore.sidebar.selectedCollection,
  }),
  actions
)(ExploreDatasetsActions);
