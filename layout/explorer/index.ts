import { connect } from 'react-redux';
import * as actions from './actions';

// component
import LayoutExplorer from './component';


export default connect(
    (state) => ({
      explore: state.explore,
    }),
    actions,
  )(LayoutExplorer);