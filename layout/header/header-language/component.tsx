import { LegacyRef, useState } from 'react';
// import Link from 'next/link';
import { useDebouncedCallback } from 'use-debounce';
import Tether from 'react-tether';

import { APP_HEADER_ITEMS } from 'layout/header/constants';
import Icon from 'components/ui/icon';
import { useRouter } from 'next/router';

export default function HeaderLanguage() {
  const [isVisible, setVisibility] = useState(false);
  const toggleDropdown = useDebouncedCallback((_isVisible) => {
    setVisibility(_isVisible);
  }, 50);
  
  const router = useRouter();
  const { pathname, query, locale, asPath } = router;

  const changeLanguage = (locale: string) => {
    router.push({ pathname, query }, asPath, { locale, shallow: true });
  };

  // TO DO: might need to update element iteration with additional nav links
  const featuredLanguages =
    APP_HEADER_ITEMS.at(-1).children as Array<{ label: string; locale: string }>;
  return (
    <Tether
      attachment="top center"
      constraints={[
        {
          to: 'window',
        },
      ]}
      className="c-header-dropdown"
      renderTarget={(ref) => (
        <a
          ref={ref as LegacyRef<HTMLAnchorElement>}
          onMouseEnter={() => toggleDropdown(true)}
          onMouseLeave={() => toggleDropdown(false)}
        >
          <Icon
            name="language-globe"
            className="c-icon dropdown-link-image -small"
          />
          {featuredLanguages.find(({ locale: l }) => l === locale).label}
          <Icon
            name="down-caret"
            className="c-icon dropdown-link-image -smaller"
          />
        </a>
      )}
      renderElement={(ref) => {
        if (!isVisible || !featuredLanguages.length) return null;

        return (
          <ul
            ref={ref as LegacyRef<HTMLUListElement>}
            className="header-dropdown-list"
            onMouseEnter={() => toggleDropdown(true)}
            onMouseLeave={() => toggleDropdown(false)}
          >
            {featuredLanguages.map(({ label, locale }) => (
              <li className="header-dropdown-list-item" key={locale}>
                <a onClick={() => changeLanguage(locale)}>{label}</a>
              </li>
            ))}
          </ul>
        );
      }}
    />
  );
}
