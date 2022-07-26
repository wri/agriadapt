import { COTTON } from 'layout/intro-header/constants';
import { ValueChainPageProps } from 'types/value-chain';
import LayoutCrop from 'layout/value-chains';
import details, { default_country, quotes } from './constants';

const LayoutCotton = ({ countries }: ValueChainPageProps) => {
  return (
    <LayoutCrop
      default_country={default_country}
      crop="cotton"
      header={COTTON}
      details={details}
      countries={countries}
      quotes={quotes}
    />
  );
};

export default LayoutCotton;
