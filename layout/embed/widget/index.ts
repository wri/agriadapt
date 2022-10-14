import { RootState } from 'lib/store';
import { connect } from 'react-redux';
import Component from './component';

export default connect((state: RootState) => ({
    ...state.value_chains,
}))(Component);