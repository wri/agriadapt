import { useMemo, useCallback } from "react";
import classnames from "classnames";
import Link from "next/link";
import { Media } from "lib/media";

// constants
import { FOOTER_LINKS } from "./constants";

export default function FooterLinks() {
  const footerMenu = useMemo(
    () =>
      FOOTER_LINKS.map((i) => {
        const children = i.children || [];
        return [...[i], ...children];
      }),
    []
  );

  const getMenuItems = useCallback(
    () =>
      footerMenu.map((subMenu) => (
        <div className="c-compound-menu-item" key={subMenu[0].label}>
          <ul className="subMenu">
            {subMenu.map((item, index) => {
              let link;
              if (item.id && item.href) {
                link = item.label;
              }
              if (item.href && !item.id) {
                link = <Link href={item.href}>{item.label}</Link>;
              }

              return (
                <li
                  key={item.id || item.label}
                  className={classnames(index === 0 ? "item-title" : "item")}
                >
                  {index === 0 ? <h3>{link}</h3> : link}
                </li>
              );
            })}
          </ul>
        </div>
      )),
    [footerMenu]
  );

  return (
    <nav className="c-compound-menu">
      <div className="l-container">
        <div className="row">
          <div className="column small-12">
            <Media at="sm">
              {getMenuItems()}
            </Media>
            <Media at="md">
              {getMenuItems()}
            </Media>
            <Media greaterThanOrEqual="lg">
              <div className="c-compound-menu-wrapper">
                {getMenuItems()}
              </div>
            </Media>
            <div className="footer-related-sites">
              <div className='related-sites-title-container'>
                <h3>Related Sites</h3>
              </div>
              <div className='related-sites-images-conatiner'>
                <img src='static/images/components/layout/footer/resourceWatchLogo.svg' alt='resource-watch'/>
                <img src='static/images/components/layout/footer/wriAqueductLogo.svg' alt='aqueduct'/>
                <img src='static/images/components/layout/footer/prepLogo.svg' alt='prep'/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}