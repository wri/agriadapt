import LayoutCotton from "layout/value-chains/cotton";
import { GetStaticPaths, GetStaticProps } from "next";
import { ValueChainPageProps } from "types/value-chain";

const CottonCountryPage = (props: ValueChainPageProps) => {
  return <LayoutCotton {...props} />;
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const cid = params?.cid;

  return {
    props: {
      cid: cid,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { cid: "india" } }],
    fallback: false,
  };
};

export default CottonCountryPage;
