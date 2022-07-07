import { actions } from 'layout/value-chains/reducers';
import { RootState } from 'lib/store';
import { connect } from 'react-redux';
import FlowButton from './component';

export default connect(
  (state: RootState, ownProps: { id: string }) => ({
    active: ownProps.id === state.value_chains.activeItem,
  }),
  actions
)(FlowButton);
