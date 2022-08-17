import { RootState } from 'lib/store';
import { connect } from 'react-redux';
import PointEdit from './component';

export default connect((state: RootState) => ({
  ...state.explore.analysis.locations,
  drawer: state.explore.map.drawer,
  geoLocator: state.explore.map.geoLocator,
}))(PointEdit);
