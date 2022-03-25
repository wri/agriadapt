import React, { useEffect } from 'react';
import classnames from 'classnames';

// Utils
import { logEvent } from 'utils/analytics';

// Components
import Icon from 'components/ui/icon';

const ExploreSidebarComponent = (props: any): JSX.Element => {
  /**
   * UI EVENTS
   * - triggerToggle
   */
  const { open, setSidebarOpen, children } = props;
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

  useEffect(() => {
    console.log(props);
  }, []);

  return (
    <aside
      className={classnames({
        'c-sidebar': true,
        '-open': open,
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
        className="sidebar-content explore-sidebar"
        // onScroll={() => this.handleScroll()}
      >
        {children}
      </div>
    </aside>
  );
};

export default ExploreSidebarComponent;
