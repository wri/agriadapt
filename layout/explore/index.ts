import { RootState } from "lib/store";
import { connect } from "react-redux";
import * as actions from "./actions";

// component
import LayoutExplorer from "./component";

export default connect(
  (state: RootState) => ({
    explore: state.explore,
  }),
  actions
)(LayoutExplorer);
