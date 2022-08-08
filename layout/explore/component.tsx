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
import Head from 'next/head';

const Explore = ({
  explore: {
    datasets: { selected },
    sidebar: { open, selectedTab },
  },
  dataset: datasetData,
}): JSX.Element => {
  const [dataset, setDataset] = useState(null);

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

  const metadata = dataset && dataset.metadata && dataset.metadata[0];
  const infoObj = metadata && metadata.info;
  const titleSt = selected ? infoObj && infoObj.name : '';
  const descriptionSt = selected
    ? infoObj && infoObj.functions
    : 'Browse more than 200 global data sets on the state of our planet.';

  return (
    <Layout title={titleSt} description={descriptionSt} className="-fullscreen" isFullScreen>
      <Head>
        {/* unpublished datasets are not indexed by search engines but still accessible in the application */}
        {datasetData && !datasetData?.published && (
          <meta name="robots" content="noindex, follow" />
        )}
        {/* adds canonical url to avoid content duplicity between pages with dataset slug and ID */}
        {datasetData && (
          <link
            rel="canonical"
            href={`https://agriadapt.org/explore/${datasetData.slug}`}
          />
        )}
      </Head>
      <div className="c-page-explore">
        <ExploreSidebar>{getSidebarLayout()}</ExploreSidebar>
        <ExploreMap />
      </div>
    </Layout>
  );
};

export default Explore;
