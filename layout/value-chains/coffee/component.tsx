import { COFFEE } from "layout/intro-header/constants";
import LayoutCrop from "layout/value-chains";
import { ValueChainPageProps } from "types/value-chain";
import details from "./constants";

const LayoutCoffee = ({ cid }: ValueChainPageProps) => {
  return (
    <LayoutCrop header={COFFEE} details={details}/>
  );
};

export default LayoutCoffee;
