import classNames from "classnames";
import Icon from "components/ui/icon";
import { EXPLORE_TABS } from "../constants";

const ExploreSwitch = ({ selectedTab, setSidebarSelectedTab }) => {
  return (
    <div className="c-explore-switch-container">
      {Object.entries(EXPLORE_TABS).map(([key, value]) => {
        const iconName = classNames({
            'icon-layers': key === 'LAYERS',
            'icon-widget': key === 'ANALYSIS'
        })
        return (
          <button
            className={classNames({
              'c-button': true,
              '-primary': selectedTab === value,
              '-tertiary': selectedTab !== value,
            })}
            onClick={() => setSidebarSelectedTab(value)}
          >
            <Icon name={iconName} className="c-icon -small" />
            <span className="button-text">{value}</span>
          </button>
        );})}
    </div>
  );
};

export default ExploreSwitch;