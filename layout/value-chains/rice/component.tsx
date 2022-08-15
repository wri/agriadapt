import { RICE } from 'layout/intro-header/constants';
import LayoutCrop from 'layout/value-chains';
import details, { quotes } from './constants';

const LayoutRice = ({ countries, iso }) => {
  return (
    <LayoutCrop
      crop="rice"
      header={RICE}
      details={details}
      countries={countries}
      quotes={quotes[iso]?.quotes}
    />
  );
};

export default LayoutRice;
