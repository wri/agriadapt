import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';

// components
import Icon from 'components/ui/icon';

// constants
import { APP_HEADER_ITEMS } from 'layout/header/constants';
import { useTranslation } from 'next-i18next';

const HeaderMenuMobile = ({ header, setMobileOpened }) => {
  const { t } = useTranslation(['header', 'common']);
  const { mobileOpened } = header;

  // State to manage the "clicked" class
  const [clicked, setClicked] = useState(false);

  const classNames = classnames({ '-openeds': mobileOpened, '-opened': clicked });

  useEffect(() => {
    document.body.classList.toggle('no-scroll', mobileOpened);
  }, [mobileOpened]);

  const router = useRouter();
  const { pathname, query, asPath } = router;

  const changeLanguage = (locale) => {
    router.push({ pathname, query }, asPath, { locale });
    setMobileOpened(false);
  };

  const handleOpen = () => {
    setMobileOpened(true);
    setClicked(true); // Add the "-clicked" class
  };

  const handleClose = () => {
    setMobileOpened(false);
    setClicked(false); // Remove the "-clicked" class
  };

  return (
    <div className="c-header-menu-mobile">
      {/* Burger button to open the menu */}
      <button
        className="c-button -secondary -alt -compressed header-burger-button"
        onClick={handleOpen}
      >
        {t('menu')}
      </button>

      <div className={`header-menu-mobile-content ${classNames}`}>
        {/* Backdrop */}
        <button
          className={`c-button -clean header-menu-mobile-backdrop ${classNames}`}
          onClick={handleClose}
        />

        <nav className={`header-menu-mobile-nav ${classNames}`}>
          {/* Close button */}
          <button
            className="c-button -secondary -compressed -square header-close-button"
            onClick={handleClose}
          >
            <Icon name="icon-cross" className="-smaller" />
          </button>

          <ul>
            {APP_HEADER_ITEMS.map((item) => {
              const activeClassName = classnames({
                '-active':
                  item.children &&
                  item.children.map((c) => c['href']).includes(pathname),
              });

              return (
                <li key={item.label} className={activeClassName}>
                  {<h2>{t(item.label)}</h2>}

                  {item.children && (
                    <ul>
                      {item.children.map((c) => {
                        if (item.id === 'language') {
                          return (
                            <li key={c.label}>
                              <a onClick={() => changeLanguage(c.locale)}>{t(c.label)}</a>
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
