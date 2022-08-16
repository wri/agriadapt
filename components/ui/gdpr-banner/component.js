import PropTypes from 'prop-types';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

const GDPRBanner = ({ handleGDPR }) => {
  const { t } = useTranslation(['common']);

  return (
    <div className="c-gdpr-banner">
      <div className="l-container">
        <div className="row">
          <div className="column small-9 medium-10">
            {t('common:GDPR')}{' '}
            <Link href="/privacy-policy">
              <a target="_blank" rel="noopener noreferrer">
                {t('common:privacy_policy')}
              </a>
            </Link>{' '}
            {t('further_details')}
          </div>
          <div className="column small-3 medium-2">
            <div className="c-button-container -j-end -a-center -full-height">
              <button
                type="button"
                className="c-button -primary -alt -compressed -fs-medium"
                onClick={handleGDPR}
              >
                {t('common:Agree')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

GDPRBanner.propTypes = { handleGDPR: PropTypes.func.isRequired };

export default GDPRBanner;
