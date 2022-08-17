import { connect } from 'react-redux';
import * as actions from 'layout/explore/actions';

import ExploreDatasetsComponent from './component';
import { RootState } from 'lib/store';

export default connect(
  (state: RootState) => ({
    // Store
    datasets: state.explore.datasets,
    loading: state.explore.datasets.loading,
    advOpen: state.explore.filters.advanced.open,
    sidebarOpen: state.explore.sidebar.open,
    filters: state.explore.filters,
    hasMoreDatasets: state.explore.datasets.hasMore,
  }),
  actions
)(ExploreDatasetsComponent);
