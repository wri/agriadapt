import classnames from 'classnames';
import Link from 'next/link';

// components
import HeaderMenu from 'layout/header/header-menu';
import Icon from 'components/ui/icon';
import { Media } from 'lib/media';
import HeaderMenuMobile from 'layout/header/header-menu-mobile';

interface HeaderProps {
  className?: string;
  pageHeader?: boolean;
}

export default function Header({
  className = null,
  pageHeader = false,
}: HeaderProps) {
  const headerClass = classnames('l-header', {
    '-transparent': pageHeader,
    [className]: !!className,
  });

  return (
    <header className={headerClass}>
      <div className="l-container">
        <div className="row">
          <div className="column">
            <div className="header-main">
              <div className="header-logo">
                <Link href="/">
                  <a>
                    <Icon
                      name="icon-agri-adapt"
                      className="brand-logo"
                      style={undefined}
                    />
                  </a>
                </Link>
              </div>
              <div className="c-nav">
                <Media lessThan="lg">
                  <HeaderMenuMobile />
                </Media>
                <Media greaterThanOrEqual="lg">
                  <HeaderMenu />
                </Media>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
