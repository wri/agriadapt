import { COFFEE } from "layout/intro-header/constants";
import LayoutCrop from "layout/value-chains";
import { ValueChainPageProps } from "types/value-chain";

const LayoutCoffee = ({ cid }: ValueChainPageProps) => {
  return (
    <LayoutCrop header={COFFEE} user_stories={null} />
  );
};

export default LayoutCoffee;
