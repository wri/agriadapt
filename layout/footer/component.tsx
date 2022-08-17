// components
import FooterLinks from './footer-links';
import Link from 'next/link';
import { Media } from 'lib/media';
import Image from 'next/image';
import wriLogo from 'public/images/wri-logo.svg';
import loader from 'lib/imageLoader';
import { useTranslation } from 'next-i18next';
import TermsOfServiceModal from 'components/modal/tos-modal';
import PrivacyPolicyModal from 'components/modal/privacy-policy-modal';

export default function Footer({
  setShowTermsModal,
  setShowPrivacyModal,
  showTermsModal,
  showPrivacyModal,
}) {
  const { t } = useTranslation(['common', 'footer']);

  const handleToggleTerms = () => {
    setShowTermsModal(!showTermsModal);
  };

  const handleTogglePrivacy = () => {
    setShowPrivacyModal(!showPrivacyModal);
  };

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
                    <Image
                      src={wriLogo}
                      loader={loader}
                      alt={t('common:world_resources_institute')}
                    />
                  </a>
                </div>
                <div className="footer-item">
                  <p>
                    <a onClick={handleToggleTerms}>
                      {t('common:terms_of_service')}
                    </a>
                  </p>
                  <p>
                    <a onClick={handleTogglePrivacy}>
                      {t('footer:privacy_policy')}
                    </a>
                  </p>
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
                    © {t('common:world_resources_institute')} 2022
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="column small-12">
                <div className="footer-container">
                  <div className="footer-item">
                    {t('footer:powered_by')}
                    <img
                      className="rw-logo"
                      alt={'Resource Watch'}
                      src="/images/Logo-RW.svg"
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
                    © {t('common:world_resources_institute')} 2022
                  </div>
                  <div className="footer-item">
                    <span>{t('footer:powered_by')}</span>
                    <Link href="https://resourcewatch.org">
                      <img
                        className={'rw-logo'}
                        alt={'Resource Watch'}
                        src="/images/Logo-RW.svg"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Media>
        </div>
      </div>
      {showTermsModal && <TermsOfServiceModal onClose={handleToggleTerms} />}
      {showPrivacyModal && <PrivacyPolicyModal onClose={handleTogglePrivacy} />}
    </footer>
  );
}
