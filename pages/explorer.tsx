import LayoutExplorer from "layout/explorer";
import { GetStaticProps } from "next";

interface ExplorerProps {
    MAPBOXGL_ACCESS_TOKEN: string
}

const Explorer = ({ MAPBOXGL_ACCESS_TOKEN }: ExplorerProps) => {
    return (
        <LayoutExplorer MAPBOXGL_ACCESS_TOKEN={MAPBOXGL_ACCESS_TOKEN} />
    )
}

export const getStaticProps: GetStaticProps = () => {
    const MAPBOXGL_ACCESS_TOKEN = process.env.MAPBOXGL_ACCESS_TOKEN;
    return { props: { MAPBOXGL_ACCESS_TOKEN: MAPBOXGL_ACCESS_TOKEN } }
}

export default Explorer;