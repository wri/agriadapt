import ContentHeader from "layout/content-header";
import { COTTON } from "layout/content-header/constants";
import Layout from "layout/layout/layout-app";
import { ValueChainPageProps } from "types/value-chain";

const LayoutCotton = ({ cid }: ValueChainPageProps) => {
  return (
    <Layout>
      <ContentHeader {...COTTON} />
    </Layout>
  );
};

export default LayoutCotton;
