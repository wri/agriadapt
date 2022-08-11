import classnames from 'classnames';
import FlowButton from 'layout/value-chains/content/navigation-controls/flow-button';
import StepItem from './step-item/component';
import { chain_items, item_labels } from '../constants';
import { useRouter } from 'next/router';

interface NavigationControlsProps {
  details: {
    inputs: any;
    production: any;
    processing?: any;
    trade: any;
  };
}

const NavigationControls = ({ details }: NavigationControlsProps) => {
  const router = useRouter();
  const { step: stepParam } = router.query;
  const activeItem = stepParam
    ? Array.isArray(stepParam)
      ? stepParam.join('')
      : stepParam
    : 'inputs';

  return (
    <div className="c-value-chain-flow">
      <div className="c-flow">
        {Object.entries(details).map(([parent, item], i) => (
          <div
            key={parent}
            className={classnames({
              'c-chain-item': true,
              '-inactive': parent !== activeItem,
            })}
          >
            <FlowButton
              start={i === 0}
              end={i === Object.keys(details).length - 1}
              label={chain_items[parent].label}
              id={parent}
              active={parent === activeItem}
            />
            <ul className="c-item-list">
              {Object.keys(item).map((key: string) => (
                <li key={key}>
                  <StepItem id={key} parent={parent} {...item_labels[key]} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavigationControls;
