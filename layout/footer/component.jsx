// components
import FooterLinks from './footer-links';
import Link from 'next/link';
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
                    <img
                      src="/static/images/wri-logo.svg"
                      alt="WRI logo"
                    />
                  </a>
                </div>
                <div className="footer-item">
                  <Link href='#'><p>Terms of Service</p></Link>
                  <Link href='#'><p>Privacy Policy</p></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
