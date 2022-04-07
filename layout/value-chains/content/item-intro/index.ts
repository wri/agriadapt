import { RootState } from "lib/store";
import { connect } from "react-redux";
import ItemIntro from "./component";

export default connect((state: RootState) => ({
    activeItem: 'inputs'
}))(ItemIntro);