import LayoutCoffee from "layout/value-chains/coffee";
import { ValueChainPageProps } from "types/value-chain";

const CoffeePage = ({cid = null}: ValueChainPageProps) => {
  return <LayoutCoffee cid={cid}/>;
};

export default CoffeePage;
