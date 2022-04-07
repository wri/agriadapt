import { RICE } from "layout/intro-header/constants";
import { ValueChainPageProps } from "types/value-chain";
import LayoutCrop from "../component";
import { chains } from "../content/constants";

const LayoutRice = ({ cid }: ValueChainPageProps) => {
  return <LayoutCrop header={RICE} details={chains.RICE} />;
};

export default LayoutRice;
