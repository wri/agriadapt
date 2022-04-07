// components
import FooterLinks from "./footer-links";
import Link from "next/link";
import { Media } from "lib/media";
export default function Footer() {
  return (
    <footer className="l-footer">
      <div className="footer-main">
        <FooterLinks />
      </div>

      <div className="footer-lower">
        <div className="l-container">
          <div className="row">
            <div className="column small-12">
              <div className="footer-container">
                <div className="footer-item">
                  <a
                    href="http://www.wri.org/"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <img src="/static/images/wri-logo.svg" alt="WRI logo" />
                  </a>
                </div>
                <div className="footer-item">
                  <Link href="#">
                    <p>Terms of Service</p>
                  </Link>
                  <Link href="#">
                    <p>Privacy Policy</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-sub">
        <div className="l-container">
          <Media at="sm">
            <div className="row">
              <div className="column small-12">
                <div className="footer-container">
                  <div className="footer-item">
                    © World Resources Institute 2022
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="column small-12">
                <div className="footer-container">
                  <div className="footer-item">
                    Powered by
                    <img
                      className="rw-logo"
                      alt={"Resource Watch"}
                      src="/static/images/Logo-RW.svg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Media>
          <Media greaterThanOrEqual="md">
            <div className="row">
              <div className="column small-12">
                <div className="footer-container">
                  <div className="footer-item">
                    © World Resources Institute 2022
                  </div>
                  <div className="footer-item">
                    <span>Powered by</span>
                    <Link href='https://resourcewatch.org' >
                      <img
                        className={"rw-logo"}
                        alt={"Resource Watch"}
                        src="/static/images/Logo-RW.svg"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Media>
        </div>
      </div>
    </footer>
  );
}
