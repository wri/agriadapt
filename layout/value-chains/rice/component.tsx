import { RICE } from "layout/intro-header/constants";
import LayoutCrop from 'layout/value-chains';
import details, { default_country, quotes } from "./constants";

const LayoutRice = ({ countries }) => {
  return (
    <LayoutCrop
    default_country={default_country}
      crop="rice"
      header={RICE}
      details={details}
      countries={countries}
      quotes={quotes}
    />
  );
};

export default LayoutRice;
