import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import Tether from 'react-tether';
import Icon from 'components/ui/icon';
import classnames from 'classnames';

const AnalysisDropdownMenu = ({ options }) => {
  const [isVisible, setVisibility] = useState(false);
  const toggleDropdown = useDebouncedCallback((_isVisible) => {
    setVisibility(_isVisible);
  }, 50);

  const dropdownRef = useRef(null);

  const handleClickAway = useCallback(
    (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        e.stopPropagation();
        toggleDropdown(false);
      }
    },
    [dropdownRef, toggleDropdown]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickAway, true);
    return () =>
      document.removeEventListener('mousedown', handleClickAway, true);
  }, [handleClickAway]);

  return (
    <Tether
      attachment="top left"
      targetAttachment="top center"
      constraints={[
        {
          to: 'scrollParent',
          pin: true,
        },
      ]}
      className={classnames('c-header-dropdown', 'c-analysis-menu-dropdown')}
      offset="0 -5px"
      renderTarget={(ref) => (
        <a
          ref={ref as React.LegacyRef<HTMLAnchorElement>}
          onClick={() => toggleDropdown(!isVisible)}
          className="align-middle cursor-pointer"
        >
          <Icon name="icon-ellipsis" className="table-action" />
        </a>
      )}
      renderElement={(ref) => {
        if (!isVisible) return null;
        return (
          <div ref={dropdownRef}>
            <ul
              ref={ref as React.LegacyRef<HTMLUListElement>}
              className="header-dropdown-list"
              onMouseEnter={() => toggleDropdown(true)}
            >
              {options.map((o) => (
                <li
                  key={o.id}
                  onClick={() => {
                    o.onClick();
                    toggleDropdown(false);
                  }}
                  className={classnames('header-dropdown-list-item', {
                    delete: o.id === 'delete',
                  })}
                >
                  <a>{o.label}</a>
                </li>
              ))}
            </ul>
          </div>
        );
      }}
    />
  );
};

export default AnalysisDropdownMenu;
