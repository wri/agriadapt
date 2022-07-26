import { useRouter } from 'next/router';
import { item_labels } from '../constants';
import DetailItem from './detail-item';

interface StepDetail {
  info: string;
  widgets?: { id: string; fullWidth?: boolean }[];
  fullWidth?: boolean;
}

interface StepDetailsProps {
  details: {
    inputs: StepDetail;
    production: StepDetail;
    processing?: StepDetail;
    trade: StepDetail;
  };
}

const StepDetails = ({ details }: StepDetailsProps) => {
  const router = useRouter();
  const { step: stepParam } = router.query;
  const step = stepParam
    ? Array.isArray(stepParam)
      ? stepParam.join('')
      : stepParam
    : 'inputs';

  return (
    <div className="c-step-details">
      {Object.entries(details[step]).map(([key, val]: [string, StepDetail]) => (
        <DetailItem key={key} id={key} label={item_labels[key]} {...val} />
      ))}
    </div>
  );
};

export default StepDetails;
