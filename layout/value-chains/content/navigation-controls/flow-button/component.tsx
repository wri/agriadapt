import Image from 'next/image';
import flowStep from 'public/images/components/flow-button/flow-step.svg';
import flowStepStart from 'public/images/components/flow-button/flow-step-start.svg';
import flowStepEnd from 'public/images/components/flow-button/flow-step-end.svg';
import classnames from 'classnames';
import Icon from 'components/ui/icon';

export interface FlowButtonProps {
  start: boolean;
  end: boolean;
  label: {
    icon: string;
    text: string;
  };
  active: boolean;
  id: string;
  setActiveItem: (id: string) => void;
}

const FlowButton = ({
  start = true,
  end = false,
  label: { icon = null, text: label = '' },
  active,
  id,
  setActiveItem,
}: FlowButtonProps) => {
  const handleClick = () => {
    !active && setActiveItem(id);
  };

  return (
    <div
      className={classnames({
        'c-flow-step': true,
        '-active': active,
      })}
    >
      <a onClick={handleClick}>
        <Image
          loader={({ src }) => src}
          src={start ? flowStepStart : end ? flowStepEnd : flowStep}
          alt="label"
        />
        <div
          className={classnames({
            'c-step-label': true,
            '-start': start,
          })}
        >
          <Icon
            className={classnames({
              'c-icon': true,
              '-big': true,
            })}
            name={icon}
          />
          <h3>{label}</h3>
        </div>
      </a>
    </div>
  );
};

export default FlowButton;
