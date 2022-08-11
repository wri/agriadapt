import { Trans, useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Modal from 'components/modal/modal-component';

const TermsOfServiceModal = () => {
  const { t } = useTranslation(['common', 'tos']);
  const router = useRouter();

  const onClose = () => {
    router.replace('/', {}, { shallow: true });
  };

  return (
    <Modal isOpen className="-no-padding" onRequestClose={onClose}>
      <div className="c-tos-modal">
        <p>{t('common:terms_of_service')}</p>
        <p>{t('common:world_resources_institute')}</p>
        <Trans>
          {t('tos:intro.address')}
          {t('tos:intro.paragraphs')}
          <br />
          <h2>{t('tos:usage.title')}</h2>
          <p>{t('tos:usage.p0')}</p>
          <p>
            <ol type="A">
              <li>{t('tos:usage.p.A')}</li>
              <li>{t('tos:usage.p.B')}</li>
              <li>{t('tos:usage.p.C')}</li>
            </ol>
          </p>
          <br />
          <h2>{t('tos:accounts_and_api_usage.title')}</h2>
          <p>
            <ol type="A">
              <li>{t('tos:accounts_and_api_usage.p.A')}</li>
              <li>{t('tos:accounts_and_api_usage.p.B')}</li>
              <li>{t('tos:accounts_and_api_usage.p.C')}</li>
              <li>
                {t('tos:accounts_and_api_usage.p.D')}
                <a
                  href="https://resourcewatch.org/api-attribution-requirements"
                  target="_blank"
                  rel="noreferrer"
                >
                  https://resourcewatch.org/api-attribution-requirements
                </a>
                {t('tos:accounts_and_api_usage.p.D1')}
              </li>
              {/* <li>{t('tos:accounts_and_api_usage.p.integrated_url_D', { url: "https://resourcewatch.org/api-attribution-requirements" })}</li> */}
              <li>{t('tos:accounts_and_api_usage.p.E')}</li>
            </ol>
          </p>
          <br />
          <h2>{t('tos:third_party_content.title')}</h2>
          <p>
            <ol type="A">
              <li>{t('tos:third_party_content.p.A')}</li>
              <li>{t('tos:third_party_content.p.B')}</li>
              <li>{t('tos:third_party_content.p.C')}</li>
            </ol>
          </p>
          <br />
          <h2>{t('tos:your_content.title')}</h2>
          <p>
            <ol type="A">
              <li>{t('tos:your_content.p.A')}</li>
              <li>{t('tos:your_content.p.B')}</li>
            </ol>
          </p>
          <br />
          <h2>{t('tos:disclaimers_and_limitations.title')}</h2>
          <p>
            <ol type="A">
              <li>{t('tos:disclaimers_and_limitations.p.0')}</li>
              <li>{t('tos:disclaimers_and_limitations.p.1')}</li>
              <li>{t('tos:disclaimers_and_limitations.p.2')}</li>
            </ol>
          </p>
          <br />
          <h2>{t('tos:dmca_compliance.title')}</h2>
          <p>{t('tos:dmca_compliance.p0')}</p>
          <p>
            <ol type="A">
              <li>{t('tos:dmca_compliance.p.A')}</li>
              <li>{t('tos:dmca_compliance.p.B')}</li>
              <li>{t('tos:dmca_compliance.p.C')}</li>
              <li>{t('tos:dmca_compliance.p.D')}</li>
              <li>{t('tos:dmca_compliance.p.E')}</li>
            </ol>
          </p>
          <br />
          <h2>{t('tos:additional_terms.title')}</h2>
          <p>
            <ol type="A">
              <li>{t('tos:additional_terms.p.A')}</li>
              <li>{t('tos:additional_terms.p.B')}</li>
              <li>{t('tos:additional_terms.p.C')}</li>
              <li>{t('tos:additional_terms.p.D')}</li>
              <li>{t('tos:additional_terms.p.E')}</li>
              <li>{t('tos:additional_terms.p.F')}</li>
            </ol>
          </p>
          <br />
        </Trans>
      </div>
    </Modal>
  );
};

export default TermsOfServiceModal;
