import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import { useEffect } from 'react';
import axios from 'axios';

export default function Dashboard(props) {
    const { MAPBOXGL_ACCESS_TOKEN, data, slug, layerUrl } = props;
    mapboxgl.accessToken = MAPBOXGL_ACCESS_TOKEN;

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/streets-v11', // style URL
            center: [-74.5, 40], // starting position [lng, lat]
            zoom: 9 // starting zoom
        });
        map.on('load', () => { 
            addTileLayerToMap(map, slug, layerUrl)
        });
    }, []);

    const addTileLayerToMap = (mapVar, title, url) => {
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
            }
        });
    }

    return (
        <div className='container'>
            <div id='map'></div>
            <div className='metadata'><pre>{JSON.stringify(data, null, 2)}</pre></div>
        </div>
    );
}

export async function getServerSideProps(context) {
    const uuid = 'b584954c-0d8d-40c6-859c-f3fdf3c2c5df';
    const res = await axios.get(`https://api.resourcewatch.org/v1/dataset/${uuid}/?includes=layer,metadata`);
    const { data } = res;
    return {
        props: {
            MAPBOXGL_ACCESS_TOKEN: process.env.MAPBOXGL_ACCESS_TOKEN,
            data: data,
            layerUrl: getTileLayerUrl(data),
            slug: getLayerSlug(data),
        }
    }
}

const getTileLayerUrl = (obj) => {
    const layerConfig = obj['data']['attributes']['layer'][0]['attributes']['layerConfig'];
    const defaultParams = layerConfig['params_config'];

    let url = layerConfig['source']['tiles'][0];

    for (const param of defaultParams) {
        url = url.replace(`{${param['key']}}`, param['default'].toString());
    }
    return url;
}

const getLayerSlug = (obj) => {
    return obj['data']['attributes']['layer'][0]['attributes']['slug'];
}