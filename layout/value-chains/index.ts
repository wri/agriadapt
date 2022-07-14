import { connect } from "react-redux";
import LayoutCrop from "./component";
import { actions } from "./reducers";

export default connect(null, actions)(LayoutCrop);