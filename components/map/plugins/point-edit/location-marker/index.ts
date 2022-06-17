import LocationMarker from './component';
import { setDataDrawing } from 'layout/explore/actions';
import { connect } from 'react-redux';
import { RootState } from 'lib/store';

export default connect(
  (state: RootState) => ({
    ...state.explore.map.drawer,
  }),
  { setDataDrawing }
)(LocationMarker);
