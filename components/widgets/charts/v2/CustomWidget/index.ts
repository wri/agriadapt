import Component from "./component";
import { connect } from "react-redux";
import { RootState } from "lib/store";

export default connect((state: RootState) => ({
    ...state.value_chains
}))(Component);