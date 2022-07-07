import { RootState } from "lib/store";
import { connect } from "react-redux";
import FlowButton from "./component";

export default connect((state: RootState) => ({
    active: false,
}))(FlowButton);