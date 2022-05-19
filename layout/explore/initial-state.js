import { BASEMAPS, LABELS } from "components/map/constants";
import { EXPLORE_TABS } from "layout/explore/constants";

const initialState = {
  // Datasets
  datasets: {
    list: [],
    loading: true,
    error: null,
    page: 1,
    limit: 10,
    total: 0,
    selected: null,
  },
  filters: {
    search: '',
    value_chains: '',
    advanced: {
      open: false,
      timescale: [],
      region: [],
      emission_scenario: [],
      supply_chain_node: [],
    },
  },
  analysis: {
    locations: {
      list: [],
      formOpen: false,
      editIndex: -1,
    }
  },
  sort: {
    selected: "most-viewed",
    direction: -1,
    isSetFromDefaultState: true,
    options: [
      { value: "updatedAt", label: "Last modified" },
      { value: "most-viewed", label: "Most viewed" },
      { value: "most-favorited", label: "Most favorited" },
      { value: "relevance", label: "Relevance" },
      { value: "createdAt", label: "Date added" },
    ],
  },

  // Map
  map: {
    viewport: {
      zoom: 3,
      latitude: 0,
      longitude: 0,
      pitch: 0,
      bearing: 0,
      transitionDuration: 250,
    },
    bounds: {
      box: null,
      options: {},
    },
    basemap: BASEMAPS.dark.id,
    labels: LABELS.light.id,
    boundaries: false,
    layerGroups: [],
    layerGroupsInteraction: {},
    layerGroupsInteractionSelected: null,
    layerGroupsInteractionLatLng: null,
    drawer: {
      isDrawing: false,
      data: null,
    },
    // contains an area ID to display in the map
    aoi: null,
    // contains a geostore id to preview in the map
    previewAoi: null,
    // contains params to be modified in the layerSpec of every layer
    // 'layer-id': {
    //  'key-to-modify: {
    //    startDate: '09-09-2018',
    //    endDate: '12-31-2019',
    //    zoom: 4,
    //    ...
    //  }
    // }
    //
    parametrization: {},
  },

  // Sidebar
  sidebar: {
    open: true,
    anchor: null,
    subsection: null,
    selected: null,
    selectedCollection: null,
    selectedTab: EXPLORE_TABS.LAYERS,
  },

  tags: {
    tooltip: false,
    list: [],
    loading: false,
    error: null,
  },
};

export default initialState;