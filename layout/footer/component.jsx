// components
import FooterLinks from './footer-links';

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
                  <p className="-bold">World Resources Institute</p>
                  <p>10 G Street NE Suite 800, Washington, DC 20002, USA</p>
                  <p>Phone +1 (202) 729-7600    |    Fax: +1 (202) 720 7610</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
