import ContentHeader from "layout/content-header";
import { RICE } from "layout/content-header/constants";
import Layout from "layout/layout/layout-app";
import { ValueChainPageProps } from "types/value-chain";

const LayoutRice = ({ cid }: ValueChainPageProps) => {
  return (
    <Layout>
      <ContentHeader {...RICE} />
    </Layout>
  );
};

export default LayoutRice;
