import { useState } from 'react';
import Link from 'next/link';
import { useDebouncedCallback } from 'use-debounce';
import Tether from 'react-tether';

import { APP_HEADER_ITEMS } from 'layout/header/constants';
import { useTranslation } from 'next-i18next';

export default function HeaderValueChains() {
  const [isVisible, setVisibility] = useState(false);
  const toggleDropdown = useDebouncedCallback((_isVisible) => {
    setVisibility(_isVisible);
  }, 50);

  const links = APP_HEADER_ITEMS[0];

  const { t } = useTranslation('header');

  return (
    <Tether
      attachment="top center"
      constraints={[
        {
          to: 'window',
        },
      ]}
      classes={{ element: 'c-header-dropdown' }}
      renderTarget={(ref) => (
        <Link href={links.href}>
          <a
            ref={ref}
            onMouseEnter={() => toggleDropdown(true)}
            onMouseLeave={() => toggleDropdown(false)}
          >
            {t('header:value_chains')}
          </a>
        </Link>
      )}
      renderElement={(ref) => {
        if (!isVisible) return null;

        return (
          <ul
            ref={ref}
            className="header-dropdown-list"
            onMouseEnter={() => toggleDropdown(true)}
            onMouseLeave={() => toggleDropdown(false)}
          >
            {links.children.map(({ id, label, href }) => (
              <li className="header-dropdown-list-item" key={id}>
                <Link href={href}>
                  <a>{label}</a>
                </Link>
              </li>
            ))}
          </ul>
        );
      }}
    />
  );
}
