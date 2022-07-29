import { createAction } from '@reduxjs/toolkit';
import { createThunkAction } from 'redux-tools';
import sortBy from 'lodash/sortBy';

// Constants
import { GADM_COUNTIRES_DATASET_ID, GADM_COUNTRIES_SQL } from 'constants/app';

// Services
import { fetchDatasets as fetchDatasetsService } from 'services/dataset';
import { fetchDatasetQuery as fetchDatasetQueryService } from 'services/query';
import { fetchInferredTags } from 'services/graph';

// Utils
import { TAGS_BLACKLIST } from 'utils/tags';

// RESET
export const resetExplore = createAction('EXPLORE/resetExplore');

// DATASETS
export const setDatasets = createAction<Record<string, any>[]>('EXPLORE/setDatasetsList');
export const setDatasetsLoading = createAction<boolean>('EXPLORE/setDatasetsLoading');
export const setDatasetsError = createAction<any>('EXPLORE/setDatasetsError');
export const setHasMoreDatasets = createAction<boolean>('EXPLORE/setHasMoreDatasets');
export const setDatasetsPage = createAction('EXPLORE/setDatasetsPage');
export const setDatasetsTotal = createAction<number>('EXPLORE/setDatasetsTotal');
export const setDatasetsLimit = createAction('EXPLORE/setDatasetsLimit');
export const setDatasetsMode = createAction('EXPLORE/setDatasetsMode');
export const setSelectedDataset = createAction<string>('EXPLORE/setSelectedDataset');
export const setFilteredDatasets = createAction(
  'EXPLORE/setFilteredDatasetsList'
);

// COUNTRIES
export const setCountryList = createAction<{ label: string; iso: string }[]>(
  'EXPLORE/setCountryList'
);
export const setStateList = createAction('EXPLORE/setStateList');

export const fetchDatasets = createThunkAction(
  'EXPLORE/fetchDatasets',
  () => (dispatch, getState) => {
    const { explore, common } = getState();

    const isMatch = (dataset) => {
      const {
        timescale: fTimescale,
        emission_scenario,
      } = explore.filters;
      const layers = dataset.layer;
      const match = layers.some(
        ({ applicationConfig }) =>
          (!emission_scenario.value ||
            !applicationConfig?.emission_scenario ||
            emission_scenario.value === applicationConfig?.emission_scenario) &&
          (fTimescale === 'any' || applicationConfig?.timescale == fTimescale)
      );
      return match;
    };

    const params = {
      language: common.locale,
      includes: 'layer,metadata,vocabulary',
      sort: `${explore.sort.direction < 0 ? '-' : ''}${explore.sort.selected}`,
      // status: "saved",
      // published: true,
      // Search
      ...(explore.filters.search && { search: explore.filters.search }),
      // Page
      'page[number]': explore.datasets.page,
      'page[size]': explore.datasets.limit,
      // Environment(s)
      env: process.env.NEXT_PUBLIC_ENVS_SHOW,
    };

    dispatch(setDatasetsLoading(true));
    dispatch(setDatasetsError(null));
    let continued = false;

    const recursiveFetch = () => {
      fetchDatasetsService(params, {}, true)
        .then((response) => {
          const { meta = {}, datasets } = response;
          dispatch(setDatasetsTotal(meta['total-items'] || 0));
          dispatch(
            setHasMoreDatasets(
              explore.datasets.page !== meta['total-pages'] || false
            )
          );
          return {
            datasets,
            hasMore: explore.datasets.page !== meta['total-pages'] || false,
          };
        })
        .then(({ datasets: data, hasMore }) => {
          // Show only published layers and extract correct applicationConfig
          const datasets = data.reduce((arr, d) => {
            const formatted = {
              ...d,
              layer: d.layer.reduce((arr, l) => {
                if (l.published)
                  arr.push({
                    ...l,
                    applicationConfig:
                      l.applicationConfig[process.env.NEXT_PUBLIC_APPLICATIONS] || {},
                  });
                return arr;
              }, []),
            };
            if (isMatch(formatted)) arr.push(formatted);
            return arr;
          }, []);

          if (!datasets.length && hasMore) {
            params['page[number]'] = params['page[number]'] + 1;
            continued = true;
            return recursiveFetch();
          }

          dispatch(setDatasetsLoading(false));
          dispatch(setDatasetsError(null));
          dispatch(
            setDatasets(
              params['page[number]'] === 1 || continued
                ? datasets
                : explore.datasets.list.concat(datasets)
            )
          );
        })
        .catch((err) => {
          dispatch(setDatasetsLoading(false));
          dispatch(setDatasetsError(err));
        });
    };

    return recursiveFetch();
  }
);

// COUNTRIES
export const fetchCountries = createThunkAction(
  'EXPLORE/fetchCountries',
  () => (dispatch) => {
    return fetchDatasetQueryService(
      GADM_COUNTIRES_DATASET_ID,
      GADM_COUNTRIES_SQL
    ).then(({ data: { data: countries } }) => {
      dispatch(
        setCountryList(
          countries
            .map((c) => ({ label: c.name_0, value: c.iso }))
            .sort((a, b) =>
              a.label < b.label ? -1 : a.label > b.label ? 1 : 0
            )
        )
      );
    });
  }
);

// MAP
export const setViewport = createAction<Record<string, any>>('EXPLORE-MAP__SET-VIEWPORT');
export const setBasemap = createAction<string>('EXPLORE-MAP__SET-BASEMAP');
export const setLabels = createAction<string>('EXPLORE-MAP__SET-LABELS');
export const setBounds = createAction('EXPLORE-MAP__SET-BOUNDS');
export const setBoundaries = createAction<boolean>('EXPLORE-MAP__SET-BOUNDARIES');
export const setAreaOfInterest = createAction(
  'EXPLORE-MAP__SET_AREA_OF_INTEREST'
);
export const setIsDrawing = createAction('EXPLORE-MAP__DRAWER__SET-IS-DRAWING');
export const setDataDrawing = createAction('EXPLORE-MAP__DRAWER__SET-DATA');
export const stopDrawing = createAction('EXPLORE-MAP__DRAWER__STOP-DRAWING');
export const setIsGeoLocating = createAction(
  'EXPLORE-MAP__GEOLOCATOR__SET-IS-GEOLOCATING'
);
export const setDataGeoLocator = createAction(
  'EXPLORE-MAP__GEOLOCATOR__SET-DATA'
);
export const setPreviewAoi = createAction('EXPLORE-MAP__PREVIEW__SET_AOI');

// LAYERS
export const toggleMapLayerGroup = createAction('EXPLORE/toggleMapLayerGroup');
export const setMapLayerGroupVisibility = createAction(
  'EXPLORE/setMapLayerGroupVisibility'
);
export const setMapLayerGroupOpacity = createAction(
  'EXPLORE/setMapLayerGroupOpacity'
);
export const setMapLayerGroupActive = createAction(
  'EXPLORE/setMapLayerGroupActive'
);
export const setMapLayerGroupsOrder = createAction(
  'EXPLORE/setMapLayerGroupsOrder'
);
export const setMapLayerParametrization = createAction(
  'EXPLORE/setMapLayerParametrization'
);
export const removeLayerParametrization = createAction(
  'EXPLORE/removeLayerParametrization'
);
export const resetLayerParametrization = createAction(
  'EXPLORE/resetLayerParametrization'
);

// INTERACTION
export const setMapLayerGroupsInteraction = createAction(
  'EXPLORE/setMapLayerGroupsInteraction'
);
export const setMapLayerGroupsInteractionSelected = createAction(
  'EXPLORE/setMapLayerGroupsInteractionSelected'
);
export const setMapLayerGroupsInteractionLatLng = createAction(
  'EXPLORE/setMapLayerGroupsInteractionLatLng'
);
export const resetMapLayerGroupsInteraction = createAction(
  'EXPLORE/resetMapLayerGroupsInteraction'
);

export const setMapLayerGroups = createAction<{datasets: any, params: any}>('EXPLORE/setMapLayerGroups');
export const fetchMapLayerGroups = createThunkAction(
  'EXPLORE/fetchMapLayers',
  (payload) => (dispatch, getState) => {
    const { common } = getState();

    const params = {
      language: common.locale,
      includes: 'layer',
      ids: payload.map((lg) => lg.dataset).join(','),
        'page[size]': 999,
    };

    return fetchDatasetsService(params)
      .then((data) => {
        return data.map((d) => ({
          ...d,
          layer: d.layer.map((l) => ({
            ...l,
            applicationConfig:
              l.applicationConfig[process.env.NEXT_PUBLIC_APPLICATIONS] || {},
          })),
        }));
      })
      .then((data) => {
        dispatch(
          setMapLayerGroups({
            datasets: data,
            params: payload,
          })
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
);

// FILTERS
export const setFiltersSearch = createAction<string>('EXPLORE/setFiltersSearch');
export const setFiltersAdvancedOpen = createAction(
  'EXPLORE/setFiltersAdvancedOpen'
);
export const setFiltersValueChains = createAction(
  'EXPLORE/setFiltersValueChains'
);
export const setFiltersEmissionScenario = createAction(
  'EXPLORE/setFiltersEmissionScenario'
);
export const setFiltersTimescale = createAction('EXPLORE/setFiltersTimescale');

// SORT
export const setSortSelected = createAction('EXPLORE/setSortSelected');
export const setSortIsUserSelected = createAction(
  'EXPLORE/setSortIsUserSelected'
);
export const resetFiltersSort = createAction('EXPLORE/resetFiltersSort');

// SIDEBAR
export const setSidebarOpen = createAction('EXPLORE/setSidebarOpen');
export const setSidebarAnchor = createAction('EXPLORE/setSidebarAnchor');
export const setSidebarSection = createAction('EXPLORE/setSidebarSection');
export const setSidebarSubsection = createAction(
  'EXPLORE/setSidebarSubsection'
);
export const setSidebarSelectedCollection = createAction(
  'EXPLORE/setSidebarSelectedCollection'
);
export const clearSidebarSubsection = createAction(
  'EXPLORE/clearSidebarSubsection'
);
export const setSidebarSelectedTab = createAction<string>(
  'EXPLORE/setSidebarSelectedTab'
);

// TAGS TOOLTIP
export const setTags = createAction<any[]>('EXPLORE/setTags');
export const setTagsTooltip = createAction('EXPLORE/setTagsTooltip');
export const setTagsLoading = createAction<boolean>('EXPLORE/setTagsLoading');
export const setTagsError = createAction<string | null>('EXPLORE/setTagsError');
export const resetTags = createAction('EXPLORE/resetTags');

// ANALYSIS LOCATION
export const addLocation = createAction('EXPLORE/addLocation');
export const editLocation = createAction('EXPLORE/editLocation');
export const renameLocation = createAction('EXPLORE/renameLocation');
export const removeLocation = createAction('EXPLORE/removeLocation');
export const setEditing = createAction('EXPLORE/setEditing');
export const setIsAdding = createAction('EXPLORE/setIsAdding');

// Async actions
export const fetchTags = createThunkAction(
  'EXPLORE/fetchTags',
  (tags) => (dispatch) => {
    dispatch(setTagsLoading(true));

    return fetchInferredTags({ concepts: tags.join(',') })
      .then((data) => {
        dispatch(
          setTags(
            sortBy(
              data.filter(
                (tag) =>
                  !TAGS_BLACKLIST.includes(tag.id) &&
                  !!tag.labels[1] &&
                  tag.labels[1] !== 'GEOGRAPHY'
              ),
              (t) => t.label
            )
          )
        );
        dispatch(setTagsLoading(false));
        dispatch(setTagsError(null));
      })
      .catch((err) => {
        dispatch(setTagsLoading(false));
        dispatch(setTagsError(err.message));
      });
  }
);
