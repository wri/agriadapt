import * as actions from 'layout/explore/actions';
import { RootState } from 'lib/store';
import { connect } from 'react-redux';
import ExploreAnalysis from './component';

export default connect((state: RootState) => ({ ...state.explore.analysis }),
  actions,
)(ExploreAnalysis);
