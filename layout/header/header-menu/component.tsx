import {
  createElement,
} from 'react';
import classnames from 'classnames';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Link from 'next/link';

// components
import { APP_HEADER_ITEMS } from 'layout/header/constants';

const header = {
  menu: import('.'),
};

const HeaderMenu = () => {
  const {
    pathname,
  } = useRouter();

  return (
    <nav className="header-menu">
      <ul>
        {APP_HEADER_ITEMS.map((item) => {
          console.log('item', item)
          const activeClassName = classnames({ '-active': item.pages && item.pages.includes(pathname) });
          let DropdownMenu;
          // if (item.id !== 'blog') {
          //   DropdownMenu = dynamic(() => header[item.id]);
          // }

          return (
            <li
              key={item.label}
              className={activeClassName}
            >
              {(!DropdownMenu && item.href)
                && (
                <Link href={item.href}>
                  <a>{item.label}</a>
                </Link>
                )}

              {DropdownMenu && createElement(DropdownMenu, item)}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default HeaderMenu;
