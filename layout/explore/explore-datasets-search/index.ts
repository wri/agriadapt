import ExploreSearchComponent from './component';
import { connect } from 'react-redux';
import { RootState } from 'lib/store';
import * as actions from 'layout/explore/actions';

export default connect(
  (state: RootState) => ({
    ...state.explore.filters,
  }),
 actions
)(ExploreSearchComponent);