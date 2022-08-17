import { RootState } from 'lib/store';
import { connect } from 'react-redux';
import LayoutCoffee from './component';

export default connect((state: RootState) => ({
  country: state.value_chains.country,
}))(LayoutCoffee);
