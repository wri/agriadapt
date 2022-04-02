import LayoutRice from "layout/value-chains/rice";
// import { fetchWidget } from "services/widget";
import { ValueChainPageProps } from "types/value-chain";
// import { APIWidgetSpec } from "types/widget";

const RicePage = ({ cid = null }: ValueChainPageProps) => {
  return <LayoutRice cid={cid} />;
};

export default RicePage;
