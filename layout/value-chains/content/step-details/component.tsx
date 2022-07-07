import { chain_items } from '../constants';
import DetailItem from './detail-item/component';

interface StepDetail {
  info: string;
  widgetId?: string;
}

interface StepDetailsProps {
  // activeChain: 'RICE' | 'COTTON' | 'COFFEE';
  activeItem?: 'inputs' | 'production' | 'processing' | 'trade';
  details: {
    inputs: StepDetail;
    production: StepDetail;
    processing?: StepDetail;
    trade: StepDetail;
  }
}

const StepDetails = ({ activeItem, details }: StepDetailsProps) => {
  const items = chain_items[activeItem].options;

  return (
    <div className="c-step-details">
      {Object.entries(details[activeItem]).map(([key, val]) => (
        <DetailItem key={key} label={items[key]} {...val} />
      ))}
    </div>
  );
};

export default StepDetails;