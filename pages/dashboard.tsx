import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { renderToString } from 'react-dom/server';
import { GetStaticProps } from 'next';

export default function Dashboard(props) {
    const { MAPBOXGL_ACCESS_TOKEN, datasets, baseUrl } = props;
    const [activeLayer, setActiveLayer] = useState(0);
    const map = useRef(null);
    mapboxgl.accessToken = MAPBOXGL_ACCESS_TOKEN;
    useEffect(() => {
        if (map.current) return;

        map.current = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/streets-v11', // style URL
            center: [-74.5, 40], // starting position [lng, lat]
            zoom: 9, // starting zoom
        });

        map.current.on('load', () => {
            const { slug, layerUrl } = datasets[1];
            addRasterTileLayerToMap(map.current, slug, layerUrl);
            const { source } = datasets[0];
            addVectorTileLayerToMap(map.current, 'wdpa-tile-cache', source, 'wdpa_protected_areas');
        });

        const popupContentForWDPA =  async (f) => {
            const landAreaHectare = (f.properties['rep_area'] - f.properties['rep_m_area']) * 100;
            const wdpaId = f.properties['wdpaid'];
            const tclResponse = await callApiQueryWDPATreeCoverLoss(wdpaId, 2019, 30);
    
            return renderToString(
                <div>
                    <span>name:{' '}
                        <a target='_blank' rel="noreferrer" href={`https://protectedplanet.net/${wdpaId}`}>{f.properties['name']}</a>
                    </span>
                    <br />
                    <span>
                        wdpaid: {wdpaId}
                    </span>
                    <br />
                    <span>
                        land area (ha): {landAreaHectare.toFixed(2)}
                    </span>
                    <br />
                    {tclResponse.keys &&
                        <span>
                            2019 TCL area (ha): {tclResponse['data'][0]['tcl_ha'].toFixed(2)}
                        </span>
                    }
                </div>
            );
        }

        map.current.on('click', 'wdpa-tile-cache', async (e) => {
            const features = map.current.queryRenderedFeatures(e.point, {layers: ['wdpa-tile-cache']});
            new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(await popupContentForWDPA(features[0]))
            .addTo(map.current);
        });

        map.current.on('mouseenter', 'wdpa-tile-cache', () => {
            map.current.getCanvas().style.cursor = 'pointer';
        });

        map.current.on('mouseleave', 'wdpa-tile-cache', () => {
            map.current.getCanvas().style.cursor = '';
        });
    }, [datasets]);

    const addRasterTileLayerToMap = (mapVar, title, url) => {
        // need to first add a source
        mapVar.addSource(title, {
            'type': 'raster',
            'tiles': [
                url
            ],
            'tilesize': 256
        });
        // then add the layer, referencing the source
        mapVar.addLayer({
            'id': title,
            'type': 'raster',
            'source': title,
            'paint': {
                'raster-opacity': 1  // let mapbox baselayer peak through
            },
            'layout': {
                'visibility': 'visible',
            },
        });
    }

    const addVectorTileLayerToMap = (mapVar, title, source, layer) => {
        // need to first add a source
        mapVar.addSource(title, source);
        // then add the layer, referencing the source
        mapVar.addLayer({
            'id': title,
            'type': 'fill',
            'source': title,
            'source-layer': layer,
            'paint': {
                'fill-opacity': 0.25,
                'fill-color': '#A6CEE3'
            },
            'layout': {
                'visibility': 'visible',
            },
        });
    }

    const handleLayerToggle = (i) => {
        const layers = ['Tree-cover-loss-2001-2019', 'wdpa-tile-cache'];
        setActiveLayer(i);
        const visibility = map.current.getLayoutProperty(layers[i], 'visibility');
        if (visibility === 'visible')
            map.current.setLayoutProperty(layers[i], 'visibility', 'none');
        else
            map.current.setLayoutProperty(layers[i], 'visibility', 'visible');
    }

    const callApiQueryWDPATreeCoverLoss = async (wdpaId, year, threshold) => {
        const queryDatasetId = 'a4d92f66-83f4-40f9-9d70-17297ef90e63'; // this ID (from tutorial) appears to no longer exist
        const sqlQuery = 'https://api.resourcewatch.org/v1/query/' +
            '?sql=SELECT SUM(umd_tree_cover_loss__ha) AS tcl_ha ' +
            'FROM ' + queryDatasetId +
            ' WHERE wdpa_protected_area__id=' + wdpaId +
            ' AND umd_tree_cover_loss__year=' + year +
            ' AND umd_tree_cover_density__threshold=' + threshold;
        const data = await axios.get(sqlQuery)
            .then(({ data }) => {
                return data;
            })
            .catch((err) => {
                console.log(err);
                return {};
            });
        console.log(data);
        return data;
    }

    return (
        <div className='container'>
            <div id='map'></div>
            <div className='sidebar'>
                <div className='nav'>
                    <span>
                        <a onClick={() => handleLayerToggle(0)}>Dataset 1</a>
                    </span>
                    <span>
                        <a onClick={() => handleLayerToggle(1)}>Dataset 2</a>
                    </span>
                </div>
                <div className='metadata'>
                    <pre>{JSON.stringify(datasets[activeLayer]['data'], null, 2)}</pre>
                </div>
            </div>
        </div>
    );
}

export const getStaticProps: GetStaticProps = async(context) => {
    const uuids = ['b584954c-0d8d-40c6-859c-f3fdf3c2c5df', 'a8360d91-06af-4f2d-bd61-4e50c8687ad8'];
    const config = {
        MAPBOXGL_ACCESS_TOKEN: process.env.MAPBOXGL_ACCESS_TOKEN,
        baseUrl: process.env.BASEURL,
    }

    const datasets = await fetchDatasets(uuids);

    return { props: { ...config, datasets } };
}

const fetchDatasets = async (uuids) => {
    const datasets = await axios.post('https://api.resourcewatch.org/v1/dataset/find-by-ids?includes=layer,metadata', { ids: uuids })
        .then(({ data: { data } }) => {
            return data.map((data) => {
                const type = getLayerType(data);
                if (type === 'raster')
                    return {
                        data: data,
                        type: getLayerType(data),
                        layerUrl: getTileLayerUrl(data),
                        slug: getLayerSlug(data),
                    }
                else
                    return {
                        data: data,
                        type: getLayerType(data),
                        source: getTileLayerSourceForWDPAGeometries(data),
                    }
            });
        })
        .catch(err => {
            console.error(err);
            return [];
        });
    
    return datasets;
}

const getTileLayerUrl = (obj) => {
    const layerConfig = obj['attributes']['layer'][0]['attributes']['layerConfig'];
    const defaultParams = layerConfig['params_config'];

    let url = layerConfig['source']['tiles'][0];

    if (defaultParams) {
        for (const param of defaultParams) {
            url = url.replace(`{${param['key']}}`, param['default'].toString());
        }
    }
    return url;
}

const getLayerSlug = (obj) => {
    return obj['attributes']['layer'][0]['attributes']['slug'];
}

const getLayerType = (obj) => {
    const layerConfig = obj['attributes']['layer'][0]['attributes']['layerConfig'];
    return layerConfig['source']['type'];
}

const getTileLayerSourceForWDPAGeometries = (obj) => {
    // drill down to get a useful object
    return obj['attributes']['layer'][0]['attributes']['layerConfig']['source'];
}