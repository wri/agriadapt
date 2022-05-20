import React from 'react';
import classnames from 'classnames';

// Utils
import { logEvent } from 'utils/analytics';

// Components
import Icon from 'components/ui/icon';
import { EXPLORE_TABS } from '../constants';

const ExploreSidebarComponent = ({
  open,
  setSidebarOpen,
  children,
  selectedDataset,
  selectedTab,
}): JSX.Element => {
  /**
   * UI EVENTS
   * - triggerToggle
   */
  const triggerToggle = () => {
    // Toggle sidebar
    setSidebarOpen(!open);

    // Analytics
    if (!open) {
      logEvent('Explore Map', 'Sidebar', 'Expand sidebar');
    } else {
      logEvent('Explore Map', 'Sidebar', 'Collapse sidebar');
    }
  };

  return (
    <aside
      className={classnames({
        'c-sidebar': true,
        '-open': open,
        '-details': !!selectedDataset,
        '-wider': open && selectedTab === EXPLORE_TABS.ANALYSIS,
      })}
    >
      <button type="button" className="btn-toggle" onClick={triggerToggle}>
        <Icon
          className={classnames({
            '-little': true,
            '-left': open,
            '-right': !open,
          })}
          name="icon-arrow-down"
        />
      </button>
      <div
        className={classnames({
          'sidebar-content': true,
          'explore-sidebar': true,
          '-open': open,
        })}
        // onScroll={() => this.handleScroll()}
      >
        {children}
      </div>
    </aside>
  );
};

export default ExploreSidebarComponent;