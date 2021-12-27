import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import { useEffect } from 'react';

export default function Dashboard(props) {
    const { MAPBOXGL_ACCESS_TOKEN } = props;
    mapboxgl.accessToken = MAPBOXGL_ACCESS_TOKEN;

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/streets-v11', // style URL
            center: [-74.5, 40], // starting position [lng, lat]
            zoom: 9 // starting zoom
        });
    })

    return (
        <div id="map" style={{ width: '100vw', height: '100vh' }}></div>
    );
}

export async function getStaticProps(context) {
    return {
        props: {
            MAPBOXGL_ACCESS_TOKEN: process.env.MAPBOXGL_ACCESS_TOKEN,
        }
    }
}