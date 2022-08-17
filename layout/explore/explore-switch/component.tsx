import classnames from 'classnames';
import Icon from 'components/ui/icon';
import { useTranslation } from 'next-i18next';
import { capitalizeFirstLetter } from 'utils/utils';
import { EXPLORE_TABS } from '../constants';

const ExploreSwitch = ({ open, selectedTab, setSidebarSelectedTab, setSidebarOpen }) => {
  const { t } = useTranslation(['explore', 'common']);

  const handleSelectTab = (id: string) => {
    setSidebarSelectedTab(id);
    if(!open) setSidebarOpen(true);
  }

  return (
    <div
      className={classnames({
        'c-explore-switch-container': true,
        '-open': open,
      })}
    >
      {Object.entries(EXPLORE_TABS).map(([key, value]) => {
        const iconName = classnames({
          'icon-layers': key === 'layers',
          'icon-widget': key === 'analysis',
        });
        return (
          <button
            key={key}
            className={classnames({
              'c-button': true,
              '-primary': selectedTab === value.id && open,
              '-tertiary': selectedTab !== value.id || !open,
            })}
            onClick={() => handleSelectTab(value.id)}
          >
            <Icon
              name={iconName}
              className={classnames({ 'c-icon': true, '-small': open })}
            />
            {open && (
              <span className="button-text">
                {capitalizeFirstLetter(t(value.label))}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default ExploreSwitch;
