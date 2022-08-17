import classnames from 'classnames';
import Link from 'next/link';

// components
import HeaderMenu from 'layout/header/header-menu';
// import Icon from 'components/ui/icon';
import { Media } from 'lib/media';
import HeaderMenuMobile from 'layout/header/header-menu-mobile';

import headerLogo from 'components/icons/LOGO AgriAdapt horiz 4C.svg';
import loader from 'lib/imageLoader';
import Image from 'next/image';


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
                    <div className="brand-logo">
                      <Image
                        loader={loader}
                        layout="fill"
                        // unoptimized
                        // height={180}
                        src={headerLogo}
                        alt=""
                      />
                    </div>
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
