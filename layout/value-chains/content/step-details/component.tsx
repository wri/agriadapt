import { item_labels } from '../constants';
import DetailItem from './detail-item';

interface StepDetail {
  info: string;
  widgets?: { id: string; fullWidth?: boolean }[];
}

interface StepDetailsProps {
  // activeChain: 'RICE' | 'COTTON' | 'COFFEE';
  activeItem?: 'inputs' | 'production' | 'processing' | 'trade';
  details: {
    inputs: StepDetail;
    production: StepDetail;
    processing?: StepDetail;
    trade: StepDetail;
  };
}

const StepDetails = ({ activeItem, details }: StepDetailsProps) => (
  <div className="c-step-details">
    {Object.entries(details[activeItem]).map(([key, val]) => (
      <DetailItem key={key} id={key} label={item_labels[key]} {...val} />
    ))}
  </div>
);

export default StepDetails;
