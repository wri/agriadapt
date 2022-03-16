import Layout from 'layout/layout/layout-app';
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import ExploreSidebar from 'layout/explorer/explore-sidebar';
import ExploreMap from 'layout/explore/explore-map';
import ExploreDatasets from 'layout/explorer/explore-datasets';
import ExploreDetail from 'layout/explorer/explore-detail';

interface ExplorerProps {
   explore: {
       datasets: any,
       sidebar: any,
   }
}

const LayoutExplorer = (props: ExplorerProps): JSX.Element => {
    const {
        explore: {
            datasets: { selected },
            sidebar: { subsection },
          },
    } = props;
    // const map = useRef<mapboxgl.Map | null>(null);
    const [sideBarOpen, setSideBarOpen] = useState(true);
    const [dataset, setDataset] = useState(null);

    // useEffect(() => {
    //     if (map.current) return;

    //     map.current = new mapboxgl.Map({
    //         container: 'map', // container ID
    //         style: 'mapbox://styles/mapbox/streets-v11', // style URL
    //         center: [-74.5, 40], // starting position [lng, lat]
    //         zoom: 9, // starting zoom
    //     });
    // }, []);

    const getSidebarLayout = () => (
        <>
          {(!subsection && !selected) && (
            <>
              {/* <ExploreMenu /> */}
              <div
                className="explore-sidebar-content"
                id="sidebar-content-container"
              >
                  {/* <ExploreDatasets /> */}
              </div>
            </>
          )}
          {/* {selected && (
            <ExploreDetail
              key={selected}
              onDatasetLoaded={(_dataset) => setDataset(_dataset)}
            />
          )} */}
        </>
      );

    return (
        <Layout
            title="Home"
            className="l-home"
            updateIsLoading={() => {}}
        >
            <div className="c-page-explore">
                <ExploreSidebar
                    open={sideBarOpen}
                    setSidebarOpen={setSideBarOpen}
                >
                    {getSidebarLayout()}    
                </ExploreSidebar>
                {/* <ExploreMap /> */}
            </div>
        </Layout>
    )
}

LayoutExplorer.defaultProps = {
    explore: {
        datasets: {
            list: [],
            loading: false,
            error: null,
            page: 1,
            limit: 10,
            total: 0,
            selected: null,
          },
          sidebar: {
              open: true,
              anchor: null,
              subsection: null,
              selected: null,
              selectedCollection: null,
            }
    }
}

export default LayoutExplorer;