import classnames from 'classnames';
import Icon from 'components/ui/icon';
import { EXPLORE_TABS } from '../constants';

const ExploreSwitch = ({ open, selectedTab, setSidebarSelectedTab }) => {
  return (
    <div
      className={classnames({
        'c-explore-switch-container': true,
        '-open': open,
      })}
    >
      {Object.entries(EXPLORE_TABS).map(([key, value]) => {
        const iconName = classnames({
          'icon-layers': key === 'LAYERS',
          'icon-widget': key === 'ANALYSIS',
        });
        return (
          <button
            key={key}
            className={classnames({
              'c-button': true,
              '-primary': selectedTab === value && open,
              '-tertiary': selectedTab !== value || !open,
            })}
            onClick={() => setSidebarSelectedTab(value)}
          >
            <Icon
              name={iconName}
              className={classnames({ 'c-icon': true, '-small': open })}
            />
            {open && <span className="button-text">{value}</span>}
          </button>
        );
      })}
    </div>
  );
};

export default ExploreSwitch;
