import { COFFEE } from "layout/intro-header/constants";
import LayoutCrop from "layout/value-chains";
import { ValueChainPageProps } from "types/value-chain";
import { chains } from "../content/constants";

const LayoutCoffee = ({ cid }: ValueChainPageProps) => {
  return (
    <LayoutCrop header={COFFEE} details={chains.COFFEE}/>
  );
};

export default LayoutCoffee;
