import LayoutCotton from "layout/value-chains/cotton";
import { ValueChainPageProps } from "types/value-chain";

const CottonPage = ({ cid = null }: ValueChainPageProps) => {
  return <LayoutCotton cid={cid} />;
};

export default CottonPage;
