import classnames from 'classnames';
import FlowButton from 'layout/value-chains/content/navigation-controls/flow-button';
import StepItem from './step-item/component';
import { useEffect } from 'react';
import { chain_items, item_labels } from '../constants';

interface NavigationControlsProps {
  details: {
    inputs: any;
    production: any;
    processing?: any;
    trade: any;
  }
  activeItem: 'inputs' | 'production' | 'processing' | 'trade';
  setActiveItem: (id: 'inputs' | 'production' | 'processing' | 'trade') => void;
}

const NavigationControls = ({
  details,
  activeItem,
  setActiveItem,
}: NavigationControlsProps) => {
  // Side effect to set default item to inputs
  useEffect(() => {
    setActiveItem('inputs');
  }, [setActiveItem]);

  return (
    <div className="c-value-chain-flow">
      <div className="c-flow">
        {Object.entries(details).map(([key, item], i) => (
          <div
            key={key}
            className={classnames({
              'c-chain-item': true,
              '-inactive': key !== activeItem,
            })}
          >
            <FlowButton
              start={i === 0}
              end={i === Object.keys(details).length - 1}
              label={chain_items[key].label}
              id={key}
            />
            <ul className="c-item-list">
              {Object.keys(item).map((key: string) => (
                <li key={key}>
                  <StepItem id={key} {...item_labels[key]} />
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
