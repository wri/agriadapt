import { RICE } from "layout/intro-header/constants";
import { ValueChainPageProps } from "types/value-chain";
import LayoutCrop from "../component";
import details from "./constants";

const LayoutRice = ({ countries }: ValueChainPageProps) => {
  return <LayoutCrop header={RICE} details={details} countries={countries} />;
};

export default LayoutRice;
