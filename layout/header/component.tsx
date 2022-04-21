import PropTypes from "prop-types";
import classnames from "classnames";
import Link from "next/link";

// components
import HeaderMenu from "layout/header/header-menu";
import Icon from "components/ui/icon";
import { Media } from "lib/media";
import HeaderMenuMobile from "layout/header/header-menu-mobile";

export default function Header({ className, header, pageHeader }) {
  const { admin } = header;
  const headerClass = classnames("l-header", {
    "-transparent": pageHeader,
    [className]: !!className,
  });
  const containerClass = classnames("l-container", { "-admin": admin });

  return (
    <header className={headerClass}>
      <div className={containerClass}>
        <div className="row">
          <div className="column">
            <div className="header-main">
              <div className="header-logo">
                <Link href="/">
                  <a>
                    {/* <Icon name="icon-rw-logo" className="brand-logo" style={undefined} /> */}
                    <div
                      style={{ backgroundColor: 'white', borderRadius: 4 }}
                      className="brand-logo"
                    ></div>
                    <h1 className="brand-title">Climate Risk Tool</h1>
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

Header.defaultProps = {
  className: null,
  pageHeader: false,
  header: {
    admin: false,
  },
};

Header.propTypes = {
  className: PropTypes.string,
  header: PropTypes.shape({
    admin: PropTypes.bool,
  }).isRequired,
  pageHeader: PropTypes.bool,
};
