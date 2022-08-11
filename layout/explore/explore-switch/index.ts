import { RootState } from 'lib/store';
import { connect } from 'react-redux';
import ExploreSwitchComponent from './component';
import * as actions from 'layout/explore/actions';

export default connect(
  (state: RootState) => ({
    ...state.explore.sidebar,
  }),
  actions
)(ExploreSwitchComponent);
