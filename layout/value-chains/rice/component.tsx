import { RICE } from "layout/intro-header/constants";
import { ValueChainPageProps } from "types/value-chain";
import LayoutCrop from 'layout/value-chains';
import details from "./constants";

const LayoutRice = ({ countries }: ValueChainPageProps) => {
  return <LayoutCrop crop='rice' header={RICE} details={details} countries={countries} />;
};

export default LayoutRice;
