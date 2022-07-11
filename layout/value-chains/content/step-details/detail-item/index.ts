import { RootState } from 'lib/store';
import { connect } from 'react-redux';
import DetailItem from './component';

export default connect((state: RootState) => ({
  country: state.value_chains.country,
}))(DetailItem);
