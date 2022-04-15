// Redux
import { connect } from 'react-redux';
import * as actions from 'layout/explore/actions';

import ExploreSidebarComponent from './component';
import { RootState } from 'lib/store';

export default connect(
  (state: RootState) => ({
    ...state.explore.sidebar,
    selectedDataset: state.explore.datasets.selected,
  }),
  actions
)(ExploreSidebarComponent);