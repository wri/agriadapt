import { connect } from 'react-redux';
import { withRouter } from 'next/router';

// actions
import { setIsServer as setServerAction } from 'redactions/common';
import * as actions from 'layout/explore/actions';

// components
import Explore from 'layout/explore';
import { PureComponent } from 'react';
import { RootState, wrapper } from 'lib/store';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { INDIA_BLACKLIST_DATASET_IDS } from 'layout/explore/constants';
import { fetchDataset } from 'services/dataset';
import { withSession } from 'hoc/session';

interface ExplorePageProps {
  explore: {
    datasets?: Record<string, any>;
    filters?: {
      search?: string;
      value_chains?: string[];
      emission_scenario?: string;
    };
    map?: {
      viewport: {
        zoom?: number;
        latitude?: number;
        longitude?: number;
        pitch?: number;
        bearing?: number;
      };
      basemap?: string;
      labels?: any;
      boundaries?: boolean;
      layerGroups?: Record<string, any>[];
      // aoi?: string;
    };
    sidebar?: {
      anchor?: string;
      selectedTab?: string;
    };
  };
  dataset: Record<string, any>;
  router;
  resetExplore: () => void;
  setIsServer: (isServer: boolean) => void;
  setSelectedDataset: (dataset: string) => void;
  setViewport: (params: Record<string, any>) => void;
  setBasemap: (basemap: string | string[]) => void;
  setLabels: (labels: any) => void;
  setBoundaries: (boundaries: boolean) => void;
  fetchMapLayerGroups: (layers: Record<string, any>) => void;
  setFiltersSearch: (search: string) => void;
  setSidebarSelectedTab: (tab: string) => void;
}

class ExplorePage extends PureComponent<ExplorePageProps> {
  componentDidMount() {
    const { setIsServer } = this.props;

    setIsServer(false);
  }

  componentDidUpdate(prevProps: ExplorePageProps) {
    if (this.shouldUpdateUrl(prevProps)) {
      this.setExploreURL();
    }
  }

  componentWillUnmount() {
    const { resetExplore } = this.props;

    resetExplore();
  }

  setExploreURL() {
    const {
      explore: {
        datasets,
        filters,
        map: { viewport, basemap, labels, boundaries, layerGroups },
        sidebar: { anchor, selectedTab },
      },
      router,
    } = this.props;

    const query = {
      // dataset --> "Old" Explore Detail
      ...(!!datasets && datasets.selected && { dataset: datasets.selected }),
      ...(!!anchor && { hash: anchor }),
      // section,
      // selectedCollection,
      // map params
      zoom: viewport.zoom,
      lat: viewport.latitude,
      lng: viewport.longitude,
      pitch: viewport.pitch,
      bearing: viewport.bearing,
      basemap,
      labels,
      ...(!!boundaries && { boundaries }),
      ...(!!layerGroups.length && {
        layers: encodeURIComponent(
          JSON.stringify(
            layerGroups.map((lg) => ({
              dataset: lg.dataset,
              opacity: lg.opacity || 1,
              visible: lg.visible,
              layer: lg.layers.find((l) => l.active === true)?.id,
            }))
          )
        ),
      }),
      tab: selectedTab,
      ...(filters.search && { search: filters.search }),
      ...(filters.value_chains.length && {
        value_chains: filters.value_chains,
      }),
      emission_scenario: filters.emission_scenario,
    };

    if (typeof window !== 'undefined') {
      router.replace(
        {
          pathname: '/explore/[[...dataset]]',
          query,
        },
        {},
        {
          shallow: true,
        }
      );
    }
  }

  shouldUpdateUrl(prevProps: ExplorePageProps) {
    const {
      explore: { datasets, filters, map, sidebar },
    } = this.props;

    const {
      explore: {
        datasets: prevDatasets,
        filters: prevFilters,
        map: prevMap,
        sidebar: prevSidebar,
      },
    } = prevProps;

    const layers = encodeURIComponent(
      JSON.stringify(
        map.layerGroups.map((lg) => ({
          dataset: lg.dataset,
          opacity: lg.opacity || 1,
          visible: lg.visible,
          layer: lg.layers.find((l) => l.active === true)?.id,
        }))
      )
    );

    const prevLayers = encodeURIComponent(
      JSON.stringify(
        prevMap.layerGroups.map((lg) => ({
          dataset: lg.dataset,
          opacity: lg.opacity || 1,
          visible: lg.visible,
          layer: lg.layers.find((l) => l.active === true)?.id,
        }))
      )
    );

    return (
      // Map
      map.viewport.zoom !== prevMap.viewport.zoom ||
      map.viewport.latitude !== prevMap.viewport.latitude ||
      map.viewport.longitude !== prevMap.viewport.longitude ||
      map.viewport.pitch !== prevMap.viewport.pitch ||
      map.viewport.bearing !== prevMap.viewport.bearing ||
      map.basemap !== prevMap.basemap ||
      map.labels.id !== prevMap.labels.id ||
      map.boundaries !== prevMap.boundaries ||
      layers !== prevLayers ||
      sidebar.selectedTab !== prevSidebar.selectedTab ||
      // Datasets
      datasets.selected !== prevDatasets.selected ||
      datasets.page !== prevDatasets.page ||
      filters.search !== prevFilters.search
    );
  }

  render() {
    return <Explore {...this.props} />;
  }
}

export const getServerSideProps = withSession(
  wrapper.getServerSideProps((store) => async ({ query, locale, req }) => {
    const { dispatch } = store;
    const {
      search,
      zoom,
      lat,
      lng,
      pitch,
      bearing,
      basemap,
      labels,
      boundaries,
      layers,
      dataset,
      tab,
      value_chains,
      emission_scenario,
    } = query;
    const worldview =
      req.headers['cloudfront-viewer-country'] ??
      req.session.user?.country ??
      'US';
    // const worldview = 'IN';
    req.session.user = {
      country: Array.isArray(worldview) ? worldview.join('') : worldview,
    };
    await req.session.save();
    const india_worldview = worldview === 'IN';
    dispatch(actions.setWorldview(String(worldview)));

    let datasetData = null;

    if (tab)
      dispatch(
        actions.setSidebarSelectedTab(Array.isArray(tab) ? tab.join('') : tab)
      );

    if (search)
      dispatch(
        actions.setFiltersSearch(
          Array.isArray(search) ? search.join('') : search
        )
      );

    if (value_chains)
      dispatch(
        actions.setFiltersValueChains(
          Array.isArray(value_chains) ? value_chains : value_chains.split(',')
        )
      );
    if (emission_scenario)
      dispatch(
        actions.setFiltersEmissionScenario(
          Array.isArray(emission_scenario)
            ? emission_scenario.join('')
            : emission_scenario
        )
      );
    if (dataset) {
      dispatch(
        actions.setSelectedDataset(
          Array.isArray(dataset) ? dataset.join('') : dataset
        )
      );
      datasetData = await fetchDataset(
        Array.isArray(dataset) ? dataset.join('') : dataset
      );
      if (
        india_worldview &&
        INDIA_BLACKLIST_DATASET_IDS.includes(datasetData.id)
      )
        return {
          redirect: {
            destination: '/unauthorized',
            permanent: false,
          },
        };
    }
    // sets map params from URL
    dispatch(
      actions.setViewport({
        ...(zoom && { zoom: +zoom }),
        ...(lat &&
          lng && {
            latitude: +lat,
            longitude: +lng,
          }),
        ...(pitch && { pitch: +pitch }),
        ...(bearing && { bearing: +bearing }),
      })
    );
    if (basemap)
      dispatch(
        actions.setBasemap(Array.isArray(basemap) ? basemap.join('') : basemap)
      );
    if (labels)
      dispatch(
        actions.setLabels(Array.isArray(labels) ? labels.join('') : labels)
      );
    if (boundaries) dispatch(actions.setBoundaries(!!boundaries));

    // Fetch layers
    if (layers)
      await dispatch(
        actions.fetchMapLayerGroups(
          JSON.parse(
            decodeURIComponent(Array.isArray(layers) ? layers.join('') : layers)
          )
        )
      );

    return {
      props: {
        ...(await serverSideTranslations(locale, [
          'explore',
          'common',
          'countries',
          'header',
        ])),
        ...(datasetData && { dataset: datasetData }),
      },
    };
  })
);

export default connect((state: RootState) => ({ explore: state.explore }), {
  ...actions,
  setIsServer: setServerAction,
})(withRouter(ExplorePage));
