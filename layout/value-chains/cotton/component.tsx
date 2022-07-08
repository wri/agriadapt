import { COTTON } from 'layout/intro-header/constants';
import { ValueChainPageProps } from 'types/value-chain';
import LayoutCrop from '../component';
import details from './constants';

const LayoutCotton = ({ countries }: ValueChainPageProps) => {
  return <LayoutCrop header={COTTON} details={details} countries={countries} />;
};

export default LayoutCotton;
