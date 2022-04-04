import { RootState } from "lib/store";
import { connect } from "react-redux";
import HazardsFlow from "./component";

export default connect((state: RootState) => ({
    activeItem: 'inputs',
}))(HazardsFlow);