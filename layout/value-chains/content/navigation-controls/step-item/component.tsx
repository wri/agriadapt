import classnames from 'classnames';
import Icon from 'components/ui/icon';
import { actions } from 'layout/value-chains/reducers';
import { RootState } from 'lib/store';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';

interface StepItemProps {
  id: string;
  label: string;
  icon: string;
  crop: 'rice' | 'coffee' | 'cotton';
  activeItem: 'inputs' | 'production' | 'trade';
  parent: 'inputs' | 'production' | 'trade';
  setActiveItem: (item: string) => void;
}

const StepItem = ({
  id,
  label,
  icon,
  crop,
  activeItem,
  parent,
  setActiveItem,
}: StepItemProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (parent !== activeItem) setActiveItem(parent);
    router.push(`/value-chains/${crop}/#${id}`);
  };

  return (
    <a onClick={handleClick} key={id} className="c-step-item">
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

export default connect((state: RootState) => ({
  crop: state.value_chains.crop,
  activeItem: state.value_chains.activeItem,
}), actions)(StepItem);
