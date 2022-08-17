import { actions } from 'layout/value-chains/reducers';
import { connect } from 'react-redux';
import NavigationControls from './component';

export default connect(null, actions)(NavigationControls);
