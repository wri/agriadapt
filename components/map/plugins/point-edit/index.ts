import { RootState } from 'lib/store';
import { connect } from 'react-redux';
import PointEdit from './component';

export default connect(
  (state: RootState) => ({
    ...state.explore.analysis.locations,
    ...state.explore.map.drawer,
  }),
)(PointEdit);
