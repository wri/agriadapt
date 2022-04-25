import Layout from 'layout/layout/layout-app';
import { useState } from 'react';
import ExploreSidebar from 'layout/explore/explore-sidebar';
import ExploreMap from 'layout/explore/explore-map';
import ExploreDatasets from 'layout/explore/explore-datasets';
import ExploreDetail from 'layout/explore/explore-detail';
import ExploreSwitch from './explore-switch';
import classnames from 'classnames';
import { EXPLORE_TABS } from './constants';
import ExploreAnalysis from 'layout/explore/explore-analysis';

const Explore = ({
  explore: {
    datasets: { selected },
    sidebar: { open, selectedTab },
  },
}): JSX.Element => {
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
        {selectedTab === EXPLORE_TABS.LAYERS && (
          <>
            {!selected ? (
              <ExploreDatasets />
            ) : (
              <ExploreDetail
                key={selected}
                onDatasetLoaded={(_dataset) => setDataset(_dataset)}
              />
            )}
          </>
        )}
        {selectedTab === EXPLORE_TABS.ANALYSIS && <ExploreAnalysis />}
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
