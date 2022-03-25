import ExploreSearchComponent from './component';
import { connect } from 'react-redux';
import { RootState } from 'lib/store';
import { setFiltersAdvancedOpen, setFiltersValueChains } from 'layout/explore/actions';

export default connect(
  (state: RootState) => ({
    ...state.explore.filters,
  }),
  { setFiltersAdvancedOpen, setFiltersValueChains }
)(ExploreSearchComponent);