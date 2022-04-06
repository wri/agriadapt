import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";

// components
import Icon from "components/ui/icon";

// constants
import { APP_HEADER_ITEMS } from "layout/header/constants";

const HeaderMenuMobile = ({
  header,
  setMobileOpened,
}) => {
  const { pathname } = useRouter();


  const { mobileOpened } = header;

  const classNames = classnames({ "-opened": mobileOpened });

  useEffect(() => {
    document.body.classList.toggle("no-scroll", mobileOpened);
  }, [mobileOpened]);

  return (
    <div className="c-header-menu-mobile">
      <button
        className="c-button -secondary -alt -compressed header-burger-button"
        onClick={() => setMobileOpened(true)}
      >
        Menu
      </button>

      <div className={`header-menu-mobile-content ${classNames}`}>
        <button
          className={`c-button -clean header-menu-mobile-backdrop ${classNames}`}
          onClick={() => setMobileOpened(false)}
        />

        <nav className={`header-menu-mobile-nav ${classNames}`}>
          <button
            className="c-button -secondary -compressed -square header-close-button"
            onClick={() => setMobileOpened(false)}
          >
            <Icon name="icon-cross" className="-smaller" />
          </button>
          <ul>
            {APP_HEADER_ITEMS.map((item) => {
              // const isUserLogged = !!token;
              // const isUserAdmin = isUserLogged && role === 'ADMIN';

              // If user is defined and is not equal to the current token
              // if (typeof item.user !== 'undefined' && item.user !== isUserLogged) return null;

              // If admin user is defined and is not equal to the current token
              // if (typeof item.admin !== 'undefined' && item.admin !== isUserAdmin) return null;
              if (!item.mobile && item.mobile !== false) {
                const activeClassName = classnames({
                  "-active": item.pages && item.pages.includes(pathname),
                });
  
                return (
                  <li key={item.label} className={activeClassName}>
                    {<h2>{item.label}</h2>}
  
                    {item.children && (
                      <ul>
                        {item.children.map((c) => {
                          return (
                            <li key={c.label}>
                              {c.href && (
                                <Link href={c.href}>
                                  <a>{c.label}</a>
                                </Link>
                              )}
  
                              {c.href && c.external && (
                                <a href={c.href}>{c.label}</a>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              }
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};

HeaderMenuMobile.propTypes = {
  header: PropTypes.shape({
    mobileOpened: PropTypes.bool.isRequired,
  }).isRequired,
  setMobileOpened: PropTypes.func.isRequired,
};

export default HeaderMenuMobile;
