import { COFFEE } from 'layout/intro-header/constants';
import LayoutCrop from 'layout/value-chains';
import { ValueChainPageProps } from 'types/value-chain';
import details  from './constants';

const LayoutCoffee = ({ countries }: ValueChainPageProps) => {
  return (
    <LayoutCrop
      crop="coffee"
      header={COFFEE}
      details={details}
      countries={countries}
      quotes={undefined}
    />
  );
};

export default LayoutCoffee;
