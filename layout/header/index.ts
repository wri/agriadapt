import { connect } from 'react-redux';
import * as actions from './actions';
import * as reducers from './reducers';
import initialState from './initial-state';

// component
import Header from './component';
import { RootState } from 'lib/store';

export { actions, reducers, initialState };

export default connect(
  (state: RootState) => ({
    header: state.header,
  }),
  actions,
)(Header);
