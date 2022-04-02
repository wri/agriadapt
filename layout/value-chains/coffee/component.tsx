import ContentHeader from "layout/content-header";
import { COFFEE } from "layout/content-header/constants";
import Layout from "layout/layout/layout-app";
import { ValueChainPageProps } from "types/value-chain";

const LayoutCoffee = ({ cid }: ValueChainPageProps) => {
  return (
    <Layout>
      <ContentHeader {...COFFEE} />
    </Layout>
  );
};

export default LayoutCoffee;
