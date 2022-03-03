import Layout from 'layout/layout/layout-app';
import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

interface ExplorerProps {
    MAPBOXGL_ACCESS_TOKEN: string
}

const LayoutExplorer = (props: ExplorerProps): JSX.Element => {
    const { MAPBOXGL_ACCESS_TOKEN } = props;
    const map = useRef<mapboxgl.Map | null>(null);
    mapboxgl.accessToken = MAPBOXGL_ACCESS_TOKEN;

    useEffect(() => {
        if (map.current) return;

        map.current = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/streets-v11', // style URL
            center: [-74.5, 40], // starting position [lng, lat]
            zoom: 9, // starting zoom
        });
    }, []);

    return (
        <Layout
            title="Home"
            className="l-home"
            updateIsLoading={() => {}}
        >
            <main>
                <div>
                    <div id="map"></div>
                </div>
            </main>
        </Layout>
    )
}

export default LayoutExplorer;