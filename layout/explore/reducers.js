import { createReducer } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

// utils
import { logEvent } from 'utils/analytics';
import { sortLayers } from 'utils/layers';

import * as actions from './actions';
import initialState from './initial-state';

export default createReducer(initialState, (builder) => {
  builder
    .addCase(HYDRATE, (state, { payload }) => ({ ...payload.explore }))
    // explore
    .addCase(actions.resetExplore, () => initialState)
    .addCase(actions.setWorldview, (state, { payload }) => {
      state.worldview = payload;
    })
    // datasets
    .addCase(actions.setDatasets, (state, { payload }) => ({
      ...state,
      datasets: {
        ...state.datasets,
        list: payload,
      },
    }))
    .addCase(actions.setDatasetsLoading, (state, { payload }) => ({
      ...state,
      datasets: {
        ...state.datasets,
        loading: payload,
      },
    }))
    .addCase(actions.setDatasetsError, (state, { payload }) => ({
      ...state,
      datasets: {
        ...state.datasets,
        error: payload,
      },
    }))
    .addCase(actions.setDatasetsPage, (state, { payload }) => ({
      ...state,
      datasets: {
        ...state.datasets,
        page: payload,
      },
    }))
    .addCase(actions.setDatasetsTotal, (state, { payload }) => ({
      ...state,
      datasets: {
        ...state.datasets,
        total: payload,
      },
    }))
    .addCase(actions.setHasMoreDatasets, (state, { payload }) => {
      state.datasets.hasMore = payload;
    })
    .addCase(actions.setDatasetsLimit, (state, { payload }) => ({
      ...state,
      datasets: {
        ...state.datasets,
        limit: payload,
      },
    }))
    .addCase(actions.setDatasetsMode, (state, { payload }) => {
      logEvent('Explore Menu', 'Change dataset view', payload);

      return {
        ...state,
        datasets: {
          ...state.datasets,
          mode: payload,
        },
      };
    })
    .addCase(actions.setSelectedDataset, (state, { payload }) => ({
      ...state,
      datasets: {
        ...state.datasets,
        selected: payload,
      },
    }))
    .addCase(actions.setFilteredDatasets, (state, { payload }) => {
      state.datasets.filtered = payload;
    })
    // countries
    .addCase(actions.setCountryList, (state, { payload }) => {
      state.filters.options.countries = payload;
    })
    .addCase(actions.setStateList, (state, { payload }) => {
      state.filters.options.states = payload;
    })
    .addCase(actions.setFiltersSearch, (state, { payload }) => ({
      ...state,
      filters: {
        ...state.filters,
        search: payload,
      },
    }))
    // filters
    .addCase(actions.setFiltersAdvancedOpen, (state, { payload }) => ({
      ...state,
      filters: {
        ...state.filters,
        advanced: {
          ...state.filters.advanced,
          open: payload,
        },
      },
    }))
    .addCase(actions.setFiltersValueChains, (state, { payload }) => {
      state.filters.value_chains = payload;
    })
    .addCase(actions.setFiltersEmissionScenario, (state, { payload }) => {
      state.filters.emission_scenario = payload;
    })
    .addCase(actions.setFiltersTimescale, (state, { payload }) => {
      state.filters.timescale = payload;
    })
    // sort
    .addCase(actions.setSortSelected, (state, { payload }) => ({
      ...state,
      sort: {
        ...state.sort,
        selected: payload,
      },
    }))
    .addCase(actions.setSortIsUserSelected, (state) => ({
      ...state,
      sort: {
        ...state.sort,
        isSetFromDefaultState: false,
      },
    }))
    .addCase(actions.resetFiltersSort, (state) => ({
      ...state,
      sort: {
        ...state.sort,
        selected: initialState.sort.selected,
        direction: initialState.sort.direction,
      },
    }))
    // analysis
    .addCase(actions.addLocation, (state, { payload }) => {
      const { genId } = state.analysis.locations;
      state.analysis.locations = {
        ...state.analysis.locations,
        loc_map: {
          ...state.analysis.locations.loc_map,
          [genId]: { ...payload, id: genId },
        },
        isAdding: false,
        genId: genId + 1,
      };
    })
    .addCase(actions.setEditing, (state, { payload: { id, editing } }) => {
      state.analysis.locations.loc_map[id].editing = editing;
    })
    .addCase(actions.setIsAdding, (state, { payload }) => {
      state.analysis.locations.isAdding = payload;
    })
    .addCase(actions.editLocation, (state, { payload: { id, edit } }) => {
      state.analysis.locations.loc_map[id] = edit;
      state.analysis.locations.loc_map[id].editing = false;
    })
    .addCase(actions.renameLocation, (state, { payload: { id, rename } }) => {
      state.analysis.locations.loc_map[id].label = rename;
    })
    .addCase(actions.removeLocation, (state, { payload }) => {
      delete state.analysis.locations.loc_map[payload];
    })
    // map
    .addCase(actions.setViewport, (state, { payload }) => ({
      ...state,
      map: {
        ...state.map,
        viewport: {
          ...state.map.viewport,
          ...payload,
        },
      },
    }))
    .addCase(actions.setBasemap, (state, { payload }) => ({
      ...state,
      map: {
        ...state.map,
        basemap: payload,
      },
    }))
    .addCase(actions.setLabels, (state, { payload }) => ({
      ...state,
      map: {
        ...state.map,
        labels: payload,
      },
    }))
    .addCase(actions.setBoundaries, (state, { payload }) => ({
      ...state,
      map: {
        ...state.map,
        boundaries: payload,
      },
    }))
    .addCase(actions.setBounds, (state, { payload }) => ({
      ...state,
      map: {
        ...state.map,
        bounds: payload,
      },
    }))
    .addCase(actions.setIsDrawing, (state, { payload }) => {
      state.map.drawer.isDrawing = payload;
    })
    .addCase(actions.setDataDrawing, (state, { payload }) => {
      state.map.drawer.data = payload;
    })
    .addCase(actions.stopDrawing, (state) => {
      state.map.drawer = initialState.map.drawer;
    })
    .addCase(actions.setIsGeoLocating, (state, { payload }) => {
      state.map.geoLocator.isGeoLocating = payload;
    })
    .addCase(actions.setDataGeoLocator, (state, { payload }) => {
      state.map.geoLocator.data = payload;
    })
    .addCase(actions.setAreaOfInterest, (state, { payload }) => ({
      ...state,
      map: {
        ...state.map,
        aoi: payload,
      },
    }))
    .addCase(actions.setPreviewAoi, (state, { payload }) => ({
      ...state,
      map: {
        ...state.map,
        previewAoi: payload,
      },
    }))
    // layers
    .addCase(actions.toggleMapLayerGroup, (state, { payload }) => {
      const layerGroups = [...state.map.layerGroups];
      const { dataset, toggle } = payload;
      const { applicationConfig, layer: layers } = dataset;

      let datasetLayers = layers?.filter(
        (l) =>
          // Apply emission scenario filter
          (!l.applicationConfig.emission_scenario ||
            l.applicationConfig.emission_scenario ===
              state.filters.emission_scenario) &&
          // Apply value chain filter
          (!l.applicationConfig.value_chain ||
            !state.filters.value_chains.length ||
            state.filters.value_chains.includes(
              l.applicationConfig.value_chain
            ))
      );

      // sorts layers if applies
      if (
        applicationConfig &&
        applicationConfig[process.env.NEXT_PUBLIC_APPLICATIONS] &&
        applicationConfig[process.env.NEXT_PUBLIC_APPLICATIONS].layerOrder &&
        layers.length > 1
      ) {
        const { layerOrder } =
          applicationConfig[process.env.NEXT_PUBLIC_APPLICATIONS];
        datasetLayers = sortLayers(datasetLayers, layerOrder);
      }

      if (toggle) {
        layerGroups.unshift({
          dataset: dataset.id,
          visibility: true,
          layers: datasetLayers.map((l) => ({ ...l, active: l.default })),
        });
        if (layerGroups[0].layers.length) {
          logEvent(
            'Explore Map',
            'Add layer',
            `${layerGroups[0].layers[0].name} [${layerGroups[0].layers[0].id}]`
          );
        }
      } else {
        const index = layerGroups.findIndex((l) => l.dataset === dataset.id);
        layerGroups.splice(index, 1);
      }

      // Return map
      const map = { ...state.map, layerGroups };
      return {
        ...state,
        map,
      };
    })
    .addCase(actions.setMapLayerGroupVisibility, (state, { payload }) => {
      const { dataset, visibility } = payload;
      const layerGroups = state.map.layerGroups.map((lg) => {
        if (lg.dataset !== dataset.id) return lg;
        const layers = lg.layers.map((l) => ({
          ...l,
          layerConfig: { ...l.layerConfig, visibility },
        }));
        return { ...lg, layers, visibility };
      });

      const map = { ...state.map, layerGroups };
      return {
        ...state,
        map,
      };
    })
    .addCase(actions.setMapLayerGroupOpacity, (state, { payload }) => {
      const { dataset, opacity } = payload;
      const layerGroups = state.map.layerGroups.map((lg) => {
        if (lg.dataset !== dataset.id) return lg;
        const layers = lg.layers.map((l) => ({
          ...l,
          layerConfig: { ...l.layerConfig, opacity },
        }));
        return { ...lg, layers, opacity };
      });

      const map = { ...state.map, layerGroups };
      return {
        ...state,
        map,
      };
    })
    .addCase(actions.setMapLayerGroupActive, (state, { payload }) => {
      const { dataset, active } = payload;
      const layerGroups = state.map.layerGroups.map((lg) => {
        if (lg.dataset !== dataset.id) return lg;

        const layers = lg.layers.map((l) => ({
          ...l,
          active: l.id === active,
        }));

        return { ...lg, layers };
      });

      const map = { ...state.map, layerGroups };
      return {
        ...state,
        map,
      };
    })
    .addCase(actions.setMapLayerGroupsOrder, (state, { payload }) => {
      const { datasetIds } = payload;
      const layerGroups = [...state.map.layerGroups];

      // Sort by new order
      layerGroups.sort((a, b) =>
        datasetIds.indexOf(a.dataset) > datasetIds.indexOf(b.dataset) ? 1 : -1
      );

      const map = { ...state.map, layerGroups };
      return {
        ...state,
        map,
      };
    })
    .addCase(actions.setMapLayerGroups, (state, { payload }) => {
      const { datasets, params } = payload;

      const layerGroups = datasets
        .map((_dataset) => {
          const { id, layer: layers, applicationConfig } = _dataset;
          const dParams = params.find((p) => p.dataset === id);
          // gets only published layers in selected emission scenario and value_chain
          let publishedLayers = layers.filter(
            (_layer) =>
              _layer.published &&
              (!_layer.applicationConfig.emission_scenario ||
                _layer.applicationConfig.emission_scenario ===
                  state.filters.emission_scenario) &&
              (!_layer.applicationConfig.value_chain ||
                !state.filters.value_chains.length ||
                state.filters.value_chains.includes(
                  _layer.applicationConfig.value_chain
                ))
          );
          // sorts layers if applies
          if (
            // TODO: Fix layer sort based on resource watch ordering.
            applicationConfig &&
            applicationConfig['rw'] &&
            applicationConfig['rw'].layerOrder &&
            layers.length > 1
          ) {
            const { layerOrder } = applicationConfig['rw'];
            publishedLayers = sortLayers(publishedLayers, layerOrder);
          }

          return {
            dataset: id,
            opacity: dParams.opacity,
            visibility: dParams?.visibility || true,
            layers: publishedLayers.map((_layer) => ({
              ..._layer,
              active: dParams.layer === _layer.id,
              opacity: dParams.opacity,
              visibility: dParams?.visibility || true,
            })),
          };
        })
        .sort((a, b) => {
          const aIndex = params.findIndex((p) => p.dataset === a.dataset);
          const bIndex = params.findIndex((p) => p.dataset === b.dataset);

          return aIndex > bIndex ? 1 : -1;
        });
      const map = { ...state.map, layerGroups };

      return {
        ...state,
        map,
      };
    })
    // interaction
    .addCase(actions.setMapLayerGroupsInteraction, (state, { payload }) => ({
      ...state,
      map: {
        ...state.map,
        layerGroupsInteraction: {
          ...state.map.layerGroupsInteraction,
          ...payload,
        },
      },
    }))
    .addCase(
      actions.setMapLayerGroupsInteractionSelected,
      (state, { payload }) => ({
        ...state,
        map: {
          ...state.map,
          layerGroupsInteractionSelected: payload,
        },
      })
    )
    .addCase(
      actions.setMapLayerGroupsInteractionLatLng,
      (state, { payload }) => ({
        ...state,
        map: {
          ...state.map,
          layerGroupsInteractionLatLng: payload,
        },
      })
    )
    .addCase(actions.resetMapLayerGroupsInteraction, (state) => ({
      ...state,
      map: {
        ...state.map,
        layerGroupsInteraction: {},
        layerGroupsInteractionLatLng: null,
        layerGroupsInteractionSelected: null,
      },
    }))
    // parametrization
    .addCase(actions.setMapLayerParametrization, (state, { payload }) => {
      const { id, nextConfig } = payload;
      const { map } = state;
      const { parametrization } = map;

      parametrization[id] = {
        ...parametrization[id],
        ...nextConfig,
      };

      return {
        ...state,
        map: {
          ...state.map,
          parametrization: { ...parametrization },
        },
      };
    })
    .addCase(actions.removeLayerParametrization, (state, { payload }) => {
      const { map } = state;
      const { parametrization } = map;

      delete parametrization[payload];

      return {
        ...state,
        map: {
          ...state.map,
          parametrization: { ...parametrization },
        },
      };
    })
    .addCase(actions.resetLayerParametrization, (state) => ({
      ...state,
      map: {
        ...state.map,
        parametrization: {
          ...initialState.map.parametrization,
        },
      },
    }))
    // sidebar
    .addCase(actions.setSidebarOpen, (state, { payload }) => ({
      ...state,
      sidebar: {
        ...state.sidebar,
        open: payload,
      },
    }))
    .addCase(actions.setSidebarAnchor, (state, { payload }) => ({
      ...state,
      sidebar: {
        ...state.sidebar,
        anchor: payload,
      },
    }))
    .addCase(actions.setSidebarSection, (state, { payload }) => ({
      ...state,
      sidebar: {
        ...state.sidebar,
        section: payload,
      },
    }))
    .addCase(actions.setSidebarSelectedCollection, (state, { payload }) => ({
      ...state,
      sidebar: {
        ...state.sidebar,
        selectedCollection: payload,
      },
    }))
    .addCase(actions.setSidebarSubsection, (state, { payload }) => ({
      ...state,
      sidebar: {
        ...state.sidebar,
        subsection: payload,
      },
    }))
    .addCase(actions.clearSidebarSubsection, (state) => ({
      ...state,
      sidebar: {
        ...state.sidebar,
        subsection: initialState.sidebar.subsection,
      },
    }))
    .addCase(actions.setSidebarSelectedTab, (state, { payload }) => ({
      ...state,
      sidebar: {
        ...state.sidebar,
        selectedTab: payload,
      },
    }))
    // tags
    .addCase(actions.setTagsTooltip, (state, { payload }) => ({
      ...state,
      tags: {
        ...state.tags,
        tooltip: payload,
      },
    }))
    .addCase(actions.setTags, (state, { payload }) => ({
      ...state,
      tags: {
        ...state.tags,
        list: payload,
      },
    }))
    .addCase(actions.setTagsLoading, (state, { payload }) => ({
      ...state,
      tags: {
        ...state.tags,
        loading: payload,
      },
    }))
    .addCase(actions.setTagsError, (state, { payload }) => ({
      ...state,
      tags: {
        ...state.tags,
        error: payload,
      },
    }))
    .addCase(actions.resetTags, (state) => ({
      ...state,
      tags: {
        ...initialState.tags,
      },
    }));
});
