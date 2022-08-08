import { Trans, useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import Modal from 'components/modal/modal-component';

const TermsOfServiceModal = () => {
    const { t } = useTranslation(['common', 'tos']);
    const router = useRouter();

    const onClose = () => {
        router.replace('/', {}, { shallow: true });
    }
    
    return (
        <Modal isOpen className="-no-padding" onRequestClose={onClose}>
            <div className="c-tos-modal">
                <p>{t('common:terms_of_service')}</p>
                <p>{t('common:world_resources_institute')}</p>
                <Trans>
                    {t('tos:intro.address')}
                </Trans>
                <Trans>
                    {t('tos:intro.paragraphs').map((p, i) => (<p key={i}>{p}</p>))}
                </Trans>
            </div>
        </Modal>
    )
}

export default TermsOfServiceModal;