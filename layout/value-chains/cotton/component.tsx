import { COTTON } from "layout/intro-header/constants";
import { ValueChainPageProps } from "types/value-chain";
import LayoutCrop from "../component";
import { chains } from "../content/constants";

const LayoutCotton = ({ cid }: ValueChainPageProps) => {
  return <LayoutCrop header={COTTON} details={chains.COTTON} />;
};

export default LayoutCotton;
