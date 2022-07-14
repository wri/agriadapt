import { actions } from 'layout/value-chains/reducers';
import { RootState } from 'lib/store';
import { connect } from 'react-redux';
import IntroHeader from './component';

export default connect(
  (state: RootState) => ({
    country: state.value_chains.country,
  }),
  actions
)(IntroHeader);
