import classnames from 'classnames';
import Icon from 'components/ui/icon';
import { useRouter } from 'next/router';

interface StepItemProps {
  id: string;
  label: string;
  icon: string;
  parent: 'inputs' | 'production' | 'trade';
}

const StepItem = ({ parent, id, label, icon }: StepItemProps) => {
  const router = useRouter();

  const handleOnClick = () => {
    router.push(
      { query: { ...router.query, step: parent } },
      {},
      { shallow: true }
    );
  };

  return (
    <a key={id} onClick={handleOnClick} className="c-step-item">
      <div
        className={classnames({
          'c-step-icon': true,
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
    </a>
  );
};
export default StepItem;
