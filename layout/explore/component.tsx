import Layout from "layout/layout/layout-app";
import { useState } from "react";
import ExploreSidebar from "layout/explore/explore-sidebar";
import ExploreMap from "layout/explore/explore-map";
import ExploreDatasets from "layout/explore/explore-datasets";
import ExploreDetail from "layout/explore/explore-detail";

interface ExploreProps {
  explore: {
    datasets: {
      selected: string;
    };
    sidebar: {
      section: string;
      subsection: string;
    };
    // map: {
    //   drawer: {
    //     isDrawing: boolean,
    //   }
    // }
  };
  // userIsLoggedIn: PropTypes.bool.isRequired,
  // stopDrawing: PropTypes.func.isRequired,
}

const Explore = (props: ExploreProps): JSX.Element => {
  const {
    explore: {
      datasets: { selected },
      sidebar: { subsection },
    },
  } = props;
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [_dataset, setDataset] = useState(null);

  const getSidebarLayout = () => (
    <>
      {!subsection && !selected && (
        <>
          {/* <ExploreMenu /> */}
          <div
            className="explore-sidebar-content"
            id="sidebar-content-container"
          >
            <ExploreDatasets />
          </div>
        </>
      )}
      {selected && (
        <ExploreDetail
          key={selected}
          onDatasetLoaded={(_dataset) => setDataset(_dataset)}
        />
      )}
    </>
  );

  return (
    <Layout title="Home" className="l-home" updateIsLoading={() => {}}>
      <div className="c-page-explore">
        <ExploreSidebar open={sideBarOpen} setSidebarOpen={setSideBarOpen}>
          {getSidebarLayout()}
        </ExploreSidebar>
        <ExploreMap />
      </div>
    </Layout>
  );
};

export default Explore;
