import { RootState } from "lib/store";
import { connect } from "react-redux";
import ItemInfos from "./component";

export default connect((state: RootState) => ({
  activeItem: 'inputs',
}))(ItemInfos);