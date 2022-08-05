import { useMemo, useCallback } from "react";
import classnames from "classnames";
import Link from "next/link";
import { Media } from "lib/media";

// constants
import { FOOTER_LINKS, RELATED_SITES } from "./constants";
import Image from "next/image";
import loader from "lib/imageLoader";
import { useTranslation } from "next-i18next";

export default function FooterLinks() {

  const { t } = useTranslation(['header', 'common', 'footer']);

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
              if (item['id'] && item['href']) {
                link = t(item.label);
              }
              if (item['href'] && !item['id']) {
                link = <Link href={item['href']}>{t(item.label)}</Link>;
              }

              return (
                <li
                  key={item['id'] || item.label}
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
            <Media at="sm">{getMenuItems()}</Media>
            <Media at="md">{getMenuItems()}</Media>
            <Media greaterThanOrEqual="lg">
              <div className="c-compound-menu-wrapper">{getMenuItems()}</div>
            </Media>
            <div className="footer-related-sites">
              <div className="related-sites-title-container">
                <h3>{t('footer:related_sites')}</h3>
              </div>
              <div className="related-sites-images-conatiner">
                {RELATED_SITES.map((s) => (
                  <a key={s.alt}>
                    <Link href={s.href} passHref>
                      <div className="c-image">
                        <Image
                          loader={loader}
                          unoptimized
                          src={s.image}
                          alt={t(s.alt)}
                        />
                      </div>
                    </Link>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}