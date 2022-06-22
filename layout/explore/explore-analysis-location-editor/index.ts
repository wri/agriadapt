import { RootState } from 'lib/store';
import { connect } from 'react-redux';
import ExploreAnalysisLocationEditor from './component';
import * as actions from 'layout/explore/actions';

export default connect(
  (state: RootState) => ({
    ...state.explore.analysis.locations,
    countries: state.explore.filters.options.countries,
    drawer: state.explore.map.drawer,
    geoLocator: state.explore.map.geoLocator,
  }),
  actions
)(ExploreAnalysisLocationEditor);
