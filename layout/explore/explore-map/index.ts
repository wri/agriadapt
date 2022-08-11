import { connect } from 'react-redux';

// actions
import * as actions from 'layout/explore/actions';

// selectors
import {
  getMapProps,
  exploreMapGetUpdatedLayerGroups,
  exploreMapGetUpdatedLayers,
  exploreMapGetActiveInteractiveLayers,
} from './selectors';

// components
import ExploreMap from './component';
import { RootState } from 'lib/store';

export default connect(
  (state: RootState) => ({
    ...state.explore.sidebar,
    ...state.explore.map,
    // token: state.user.token,
    // userId: state.user.id,
    activeLayers: exploreMapGetUpdatedLayers(state),
    activeInteractiveLayers: exploreMapGetActiveInteractiveLayers(state),
    layerGroups: exploreMapGetUpdatedLayerGroups(state),
    ...getMapProps(state),
  }),
  actions
)(ExploreMap);
