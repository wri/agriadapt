import { RootState } from 'lib/store';
import { connect } from 'react-redux';
import WidgetShareModal from './component';

export default connect((state: RootState) => ({ ...state.value_chains }))(
  WidgetShareModal
);