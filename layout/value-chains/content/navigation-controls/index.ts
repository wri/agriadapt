import { actions } from "layout/value-chains/reducers";
import { RootState } from "lib/store";
import { connect } from "react-redux";
import NavigationControls from "./component";

export default connect((state: RootState) => ({
    activeItem: state.value_chains.activeItem,
}), actions)(NavigationControls);