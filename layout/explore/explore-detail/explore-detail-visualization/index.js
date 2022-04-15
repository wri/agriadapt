import { connect } from "react-redux";

// constants
// import { getRWAdapter } from "utils/widget-editor";

// component
import VisualizationComponent from "./component";
import RWAdapter from "@widget-editor/rw-adapter";

export default connect(
  (state) => ({
    // authorization: state.user.token,
    aoi: state.explore.map.aoi,
    // RWAdapter: getRWAdapter(state),
    RWAdapter: RWAdapter,
  }),
  null
)(VisualizationComponent);
