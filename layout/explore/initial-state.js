import { BASEMAPS, LABELS } from 'components/map/constants';

const initialState = {
  worldview: 'US',
  // Datasets
  datasets: {
    list: [],
    loading: true,
    error: null,
    page: 1,
    limit: 10,
    total: 0,
    selected: null,
    filtered: [],
    hasMore: true,
  },
  filters: {
    search: '',
    value_chains: [],
    timescale: 'any',
    emission_scenario: 'rcp8.5',
    advanced: {
      open: false,
    },
    options: {
      countries: [],
    },
  },
  analysis: {
    locations: {
      loc_map: {},
      isAdding: false,
      editingId: null,
      genId: 0,
    },
  },
  sort: {
    selected: 'most-viewed',
    direction: -1,
    isSetFromDefaultState: true,
    options: [
      { value: 'updatedAt', label: 'Last modified' },
      { value: 'most-viewed', label: 'Most viewed' },
      { value: 'most-favorited', label: 'Most favorited' },
      { value: 'relevance', label: 'Relevance' },
      { value: 'createdAt', label: 'Date added' },
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
    geoLocator: {
      isGeoLocating: false,
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
    selectedTab: 'layers',
  },

  tags: {
    tooltip: false,
    list: [],
    loading: false,
    error: null,
  },
};

export default initialState;
