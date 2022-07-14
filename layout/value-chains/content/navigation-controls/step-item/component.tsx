import classnames from "classnames";
import Icon from "components/ui/icon";

interface StepItemProps {
  id: string;
  label: string;
  icon: string;
}

const StepItem = ({ id, label, icon }: StepItemProps) => {
    return (
      <div key={id} className="c-step-item">
        <div
          className={classnames({
            'c-step-icon': true,
            'c-button': true,
          })}
        >
          <Icon
            name={icon}
            className={classnames({
              'c-icon': true,
            })}
          />
        </div>
        <span>{label}</span>
      </div>
    );
};

export default StepItem