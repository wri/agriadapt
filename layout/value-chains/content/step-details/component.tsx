import { chains, chain_items } from '../constants';
import DetailItem from './detail-item/component';

const StepDetails = (activeChain = 'RICE', { activeItem = 'inputs' }) => {
  // const chain_steps: typeof chains.RICE = chains[activeChain];
  // const details: typeof chains.RICE.inputs = chain_steps[activeItem];
  const chain_steps = chains.RICE;
  const details = chain_steps.inputs;

  const items: typeof chain_items.inputs.options =
    chain_items[activeItem].options;

  return (
    <div className="c-step-details">
      {Object.entries(details).map(([key, val]) => (
        <DetailItem key={key} label={items[key]} {...val} />
      ))}
    </div>
  );
};

export default StepDetails;