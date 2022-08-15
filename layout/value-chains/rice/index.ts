import { RootState } from 'lib/store';
import { connect } from 'react-redux';
import LayoutRice from './component';

export default connect((state: RootState) => ({
  country: state.value_chains.country,
}))(LayoutRice);
