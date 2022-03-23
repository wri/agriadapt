import { connect } from "react-redux";
import * as actions from "layout/explore/actions";


import ExploreDatasetsComponent from "./component";
import { RootState } from "lib/store";

export default connect(
  (state: RootState) => ({
    // Store
    datasets: state.explore.datasets,
    loading: state.explore.datasets.loading,
  }),
  actions
)(ExploreDatasetsComponent);
