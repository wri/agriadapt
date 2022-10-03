import { RootState } from 'lib/store';
import { connect } from 'react-redux';
import DatasetListComponent from './component';
import * as actions from 'layout/explore/actions';

export default connect(
  (state: RootState) => ({
    hasMoreDatasets: state.explore.datasets.hasMore,
    page: state.explore.datasets.page,
  }),
  actions
)(DatasetListComponent);
