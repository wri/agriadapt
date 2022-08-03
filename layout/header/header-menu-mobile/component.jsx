import { useEffect } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";

// components
import Icon from "components/ui/icon";

// constants
import { APP_HEADER_ITEMS } from "layout/header/constants";
import { useTranslation } from "next-i18next";

const HeaderMenuMobile = ({
  header,
  setMobileOpened,
}) => {
  const { pathname } = useRouter();

  const { t } = useTranslation(['header', 'common']);

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
        {t('menu')}
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
                const activeClassName = classnames({
                  "-active": item.pages && item.pages.includes(pathname),
                });
  
                return (
                  <li key={item.label} className={activeClassName}>
                    {<h2>{t(item.label)}</h2>}
  
                    {item.children && (
                      <ul>
                        {item.children.map((c) => {
                          if (item.id === 'language') {
                            return (
                              <li key={c.label} onClick={null}>
                                {t(c.label)}
                              </li>
                            );
                          } else {
                            return (
                              <li key={c.label}>
                                {c.href && (
                                  <Link href={c.href}>
                                    <a>{t(c.label)}</a>
                                  </Link>
                                )}
                              </li>
                            );
                          }
                        })}
                      </ul>
                    )}
                  </li>
                );
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
