import { chain_items } from '../constants';
import classnames from 'classnames';
import FlowButton from 'layout/value-chains/content/flow-diagram/flow-button';
import StepItem from './step-item/component';

const FlowDiagram = ({ activeItem }) => {
  return (
    <div className="c-value-chain-flow">
      {chain_items.map((item, i) => (
        <div
          key={i}
          className={classnames({
            'c-chain-item': true,
            '-active': item.id === activeItem,
          })}
        >
          <FlowButton
            start={i === 0}
            end={i === chain_items.length - 1}
            label={item.label}
          />
          <ul className="c-item-list">
            {item.options.map((o, i) => (
              <li key={i}>
                <StepItem {...o} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default FlowDiagram;
