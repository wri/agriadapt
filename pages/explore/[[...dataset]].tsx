import { connect } from 'react-redux';
import { Router, withRouter } from 'next/router';

// actions
import { setIsServer as setServerAction, setLocale } from 'redactions/common';
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
  explore: RootState['explore'];
  dataset: Record<string, any>;
  router: Router;
  resetExplore: () => void;
  setIsServer: (isServer: boolean) => void;
  setSelectedDataset: (dataset: string) => void;
  setViewport: (params: Record<string, any>) => void;
  setBasemap: (basemap: string | string[]) => void;
  setLabels: (labels: string | string[]) => void;
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
      map.labels !== prevMap.labels ||
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
      timescale,
      add
    } = query;
    const worldview = req.session.user?.country;
    const india_worldview = worldview === 'IN';
    dispatch(actions.setWorldview(worldview));

    dispatch(setLocale(locale));

    let datasetData = null;

    if (tab)
      dispatch(
        actions.setSidebarSelectedTab(String(tab))
      );

    if (String(tab) === 'analysis' && String(add) === 'current')
        dispatch(actions.setIsAdding(true))

    if (search)
      dispatch(actions.setFiltersSearch(String(search)));

    if (value_chains)
      dispatch(
        actions.setFiltersValueChains(
          Array.isArray(value_chains) ? value_chains : value_chains.split(',')
        )
      );
    if (emission_scenario)
      dispatch(actions.setFiltersEmissionScenario(String(emission_scenario)));
    if (timescale)
          dispatch(actions.setFiltersTimescale(String(timescale)));
    if (dataset) {
      dispatch(actions.setSelectedDataset(String(dataset)));
      datasetData = await fetchDataset(String(dataset), { language: locale });
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
      dispatch(actions.setBasemap(String(basemap)));
    if (labels)
      dispatch(actions.setLabels(String(labels)));
    if (boundaries) dispatch(actions.setBoundaries(!!boundaries));

    // Fetch layers
    if (layers)
      await dispatch(
        actions.fetchMapLayerGroups(
          JSON.parse(decodeURIComponent(String(layers)))
        )
      );

    return {
      props: {
        ...(await serverSideTranslations(locale, [
          'explore',
          'common',
          'countries',
          'header',
          'modals'
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
