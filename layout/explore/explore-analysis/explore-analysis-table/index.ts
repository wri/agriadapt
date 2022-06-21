import { RootState } from 'lib/store';
import { connect } from 'react-redux';
import AnalysisTable from './component';

export default connect((state: RootState) => ({
  ...state.explore.analysis.locations,
  ...state.explore.map,
}))(AnalysisTable);