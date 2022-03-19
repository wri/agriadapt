import LayoutExplore from "layout/explore";
import { GetStaticProps } from "next";

interface ExploreProps {
  MAPBOXGL_ACCESS_TOKEN: string;
}

const Explore = ({ MAPBOXGL_ACCESS_TOKEN }: ExploreProps) => {
  return <LayoutExplore />;
};

export const getStaticProps: GetStaticProps = () => {
  const MAPBOXGL_ACCESS_TOKEN = process.env.MAPBOXGL_ACCESS_TOKEN;
  return { props: { MAPBOXGL_ACCESS_TOKEN: MAPBOXGL_ACCESS_TOKEN } };
};

export default Explore;
