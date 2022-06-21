export const appConfigs = {
    "bb96729b-2269-4b97-9187-a6113d0b1580": { // Landslide Susceptibility
        query: "select st_summarystats(rast, 'b1', false) as x from 'projects/resource-watch-gee/dis_007_landslide_susceptibility_map' where ST_INTERSECTS(ST_SetSRID(ST_GeomFromGeoJSON('{{geojson}}'),4326),the_geom)",
        output: {
            path: "x.b1.mean",
            label: "Susceptibility",
        },
        value_chains: [],
        emission_scenario: "",
        region: "",
        timescale: "",
        supply_chain_node: "",
        time_frame: ""
    }
}