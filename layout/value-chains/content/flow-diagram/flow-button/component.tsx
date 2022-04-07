import Image from "next/image";
import flowStep from 'public/static/images/components/flow-button/flow-step.svg';
import flowStepStart from 'public/static/images/components/flow-button/flow-step-start.svg';
import flowStepEnd from 'public/static/images/components/flow-button/flow-step-end.svg';
import classnames from "classnames";
import Icon from "components/ui/icon";

const FlowButton = ({
  start = true,
  end = false,
  label: { icon = null, text: label = '' },
  active = false,
}) => {
  return (
    <div
      className={classnames({
        'c-flow-step': true,
        '-active': active,
      })}
    >
      <a>
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
