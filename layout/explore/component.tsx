import Layout from 'layout/layout/layout-app';
import { useState } from 'react';
import ExploreSidebar from 'layout/explore/explore-sidebar';
import ExploreMap from 'layout/explore/explore-map';
import ExploreDatasets from 'layout/explore/explore-datasets';
import ExploreDetail from 'layout/explore/explore-detail';
import ExploreSwitch from './explore-switch';
import classnames from 'classnames';

interface ExploreProps {
  explore: {
    datasets: {
      selected: string;
    };
    sidebar: {
      section: string;
      subsection: string;
      open: boolean;
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
      sidebar: { open, subsection },
    },
  } = props;
  const [_dataset, setDataset] = useState(null);

  const getSidebarLayout = () => (
    <>
      <div className="explore-sidebar-header">
        <ExploreSwitch />
      </div>
      <div
        className={classnames({
          'explore-sidebar-content': true,
          '-hidden': !open,
        })}
        id="sidebar-content-container"
      >
        {!subsection && !selected && (
          <>
            <ExploreDatasets />
          </>
        )}
        {selected && (
          <ExploreDetail
            key={selected}
            onDatasetLoaded={(_dataset) => setDataset(_dataset)}
          />
        )}
      </div>
    </>
  );

  return (
    <Layout title="Explore">
      <div className="c-page-explore">
        <ExploreSidebar>{getSidebarLayout()}</ExploreSidebar>
        <ExploreMap />
      </div>
    </Layout>
  );
};

export default Explore;
