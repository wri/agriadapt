import classnames from "classnames";
import Icon from "components/ui/icon";

const StepItem = ({ id, label, icon }) => {
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