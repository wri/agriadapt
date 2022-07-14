import { RICE } from "layout/intro-header/constants";
import { ValueChainPageProps } from "types/value-chain";
import LayoutCrop from 'layout/value-chains';
import details, { quotes } from "./constants";

const LayoutRice = ({ countries }: ValueChainPageProps) => {
  return (
    <LayoutCrop
      crop="rice"
      header={RICE}
      details={details}
      countries={countries}
      quotes={quotes}
    />
  );
};

export default LayoutRice;
