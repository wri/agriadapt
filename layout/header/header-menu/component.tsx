import { createElement } from "react";
import classnames from "classnames";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Link from "next/link";

// components
import { APP_HEADER_ITEMS } from "layout/header/constants";

const header = {
  'value-chains': import("../header-valuechains"),
  'language': import("../header-language")
};

const HeaderMenu = () => {
  const { pathname } = useRouter();

  return (
    <nav className="header-menu">
      <ul>
        {APP_HEADER_ITEMS.map((item) => {
          let DropdownMenu;
          if (item.id === 'value-chains' || item.id === 'language') {
            DropdownMenu = dynamic(() => header[item.id]);
          }

          return (
            <li
              key={item.label}
              className={classnames({
                '-active': pathname.startsWith(item.root),
              })}
            >
              {!DropdownMenu && item.href && (
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