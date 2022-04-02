import LayoutCoffee from "layout/value-chains/coffee";
import { GetStaticPaths, GetStaticProps } from "next";
import { ValueChainPageProps } from "types/value-chain";

const CoffeePage = (props: ValueChainPageProps) => {
  return <LayoutCoffee {...props} />;
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
    paths: [{ params: { cid: 'colombia' } }],
    fallback: false,
  };
};

export default CoffeePage;
