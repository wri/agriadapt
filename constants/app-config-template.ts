export const appConfigs = {
  'bb96729b-2269-4b97-9187-a6113d0b1580': {
    // Landslide Susceptibility
    query:
      "select st_summarystats(rast, 'b1', false) as x from 'projects/resource-watch-gee/dis_007_landslide_susceptibility_map' where ST_INTERSECTS(ST_SetSRID(ST_GeomFromGeoJSON('{{geojson}}'),4326),the_geom)",
    output: {
      path: 'x.b1.mean',
    },
    value_chains: [],
    emission_scenario: '',
    region: '',
    timescale: '',
    supply_chain_node: '',
    time_frame: '',
  },
  '105d8e48-784c-4e77-801d-389327d2f6dd': {
    // 2000 Projected Change in Extreme Precipitation Days
    query:
      "select first(q50) as x from 'projects/resource-watch-gee/nexgddp/nexgddp_gt-q99_pr/nexgddp_rcp85_gt-q99_pr_ch_1985_2015' where ST_INTERSECTS(ST_SetSRID(ST_GeomFromGeoJSON('{{geojson}}'),4326),the_geom)",
    output: {
      path: 'x',
    },
    value_chains: [],
    emission_scenario: '',
    region: '',
    timescale: '',
    supply_chain_node: '',
    time_frame: '',
  },
  '7e544a59-8d07-4870-a087-ed45aa71140e': {
    // 2010 Projected Change in Extreme Precipitation Days
    query:
      "select first(q50) as x from 'projects/resource-watch-gee/nexgddp/nexgddp_gt-q99_pr/nexgddp_rcp85_gt-q99_pr_ch_1995_2025' where ST_INTERSECTS(ST_SetSRID(ST_GeomFromGeoJSON('{{geojson}}'),4326),the_geom)",
    output: {
      path: 'x',
    },
    value_chains: [],
    emission_scenario: '',
    region: '',
    timescale: '',
    supply_chain_node: '',
    time_frame: '',
  },
  'd31acf31-57d7-472e-8641-33127ede7b1c': {
    //2080  Projected Change in Extreme Precipitation Days
    query:
      "select first(q50) as x from 'projects/resource-watch-gee/nexgddp/nexgddp_gt-q99_pr/nexgddp_rcp85_gt-q99_pr_ch_2065_2095' where ST_INTERSECTS(ST_SetSRID(ST_GeomFromGeoJSON('{{geojson}}'),4326),the_geom)",
    output: {
      path: 'x',
    },
    value_chains: [],
    emission_scenario: '',
    region: '',
    timescale: '',
    supply_chain_node: '',
    time_frame: '',
  },
};
