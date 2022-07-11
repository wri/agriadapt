import { RootState } from "lib/store";
import { connect } from "react-redux";
import StepDetails from "./component";

export default connect((state: RootState) => ({
  activeItem: state.value_chains.activeItem,
}))(StepDetails);