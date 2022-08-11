import { Trans, useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import Modal from 'components/modal/modal-component';

const PrivacyPolicyModal = () => {
    const { t } = useTranslation(['common', 'tos']);
    const router = useRouter();

    const onClose = () => {
        router.replace('/', {}, { shallow: true });
    }
    
    return (
        <Modal isOpen className="-no-padding" onRequestClose={onClose}>
            <div className="c-tos-modal">
                <Trans>
                <p>{t('privacy:world_resouce_institute.title')}</p>
                    <p>{t('privacy:world_resouce_institute.sub_title')}</p>
                    <p>{t('privacy:world_resouce_institute.p')}</p>
                    <br/>
                    <h2>{t('privacy:information_we_collect.title')}</h2>
                    <p>{t('privacy:information_we_collect.p')}</p>
                    <br/>
                    <h2>{t('privacy:why_we_collect_this_information.title')}</h2>
                    <p>{t('privacy:why_we_collect_this_information.p0')}</p>
                    <p>
                        <ul>
                            <li>{t('privacy:why_we_collect_this_information.p.0')}</li>
                            <li>{t('privacy:why_we_collect_this_information.p.1')}</li>
                            <li>{t('privacy:why_we_collect_this_information.p.2')}</li>
                            <li>{t('privacy:why_we_collect_this_information.p.3')}</li>
                            <li>{t('privacy:why_we_collect_this_information.p.4')}</li>
                        </ul>
                    </p>
                    <br/>
                    <h2>{t('privacy:who_we_share_your_information_with.title')}</h2>
                    <p>{t('privacy:who_we_share_your_information_with.p0')}</p>
                    <p>
                        <ul>
                            <li>{t('privacy:who_we_share_your_information_with.p.0')}</li>
                            <li>{t('privacy:who_we_share_your_information_with.p.1')}</li>
                            <li>{t('privacy:who_we_share_your_information_with.p.2')}</li>
                        </ul>
                    </p>
                    <br/>
                    <h2>{t('privacy:security_of_your_information.title')}</h2>
                    <p>{t('privacy:security_of_your_information.p')}</p>
                    <br/>
                    <h2>{t('privacy:use_of_online_tracking_technologies.title')}</h2>
                    <p>{t('privacy:use_of_online_tracking_technologies.p')}</p>
                    <p>
                        {t('privacy:use_of_online_tracking_technologies.text1')}
                        <a href="http://tools.google.com/dlpage/gaoptout" target="_blank" rel="noreferrer">http://tools.google.com/dlpage/gaoptout</a>
                        {t('privacy:use_of_online_tracking_technologies.text2')}
                        <a href="https://optout.networkadvertising.org/?c=1" target="_blank" rel="noreferrer">www.networkadvertising.org/choices/</a>
                        {t('privacy:use_of_online_tracking_technologies.text3')}
                        <a href="https://www.youronlinechoices.com/" target="_blank" rel="noreferrer">www.youronlinechoices.com</a>
                        {t('privacy:use_of_online_tracking_technologies.text4')}
                        <a href="https://www.google.com/policies/privacy/" target="_blank" rel="noreferrer">https://www.google.com/policies/privacy/</a>
                        {t('privacy:use_of_online_tracking_technologies.text5')}
                        <a href="http://www.google.com/analytics/terms/us.html" target="_blank" rel="noreferrer">http://www.google.com/analytics/terms/us.html</a>
                        {t('privacy:use_of_online_tracking_technologies.text6')}
                        <a href="http://www.google.com/analytics/learn/index.html" target="_blank" rel="noreferrer">http://www.google.com/analytics/learn/index.html</a>
                        {t('privacy:use_of_online_tracking_technologies.text7')}
                    </p>

                    {/* <p>{t('privacy:use_of_online_tracking_technologies.p1', {url1: "http://tools.google.com/dlpage/gaoptout"})}
                    {t('privacy:use_of_online_tracking_technologies.p2', {url2: "www.networkadvertising.org/choices/"})}
                    {t('privacy:use_of_online_tracking_technologies.p3', {url3: "www.youronlinechoices.com"})}
                    {t('privacy:use_of_online_tracking_technologies.p4', {url4: "https://www.google.com/policies/privacy/"})}
                    {t('privacy:use_of_online_tracking_technologies.p5', {url5: "http://www.google.com/analytics/terms/us.html"})}
                    {t('privacy:use_of_online_tracking_technologies.p6', {url6: "http://www.google.com/analytics/learn/index.html"})}</p> */}
                    
                    <br/>
                    <h2>{t('privacy:use_of_cookies.title')}</h2>
                    <p>{t('privacy:use_of_cookies.p')}</p>
                    <br/>
                    <h2>{t('privacy:choices.title')}</h2>
                    <p>
                        <p>{t('privacy:choices.p.p1')}</p>
                        <br/>
                        <p>{t('privacy:choices.p.p2.p20')}</p>
                        <ul>
                            <li>{t('privacy:choices.p.p2.p21.0')}</li>
                            <li>{t('privacy:choices.p.p2.p21.1')}</li>
                            <li>{t('privacy:choices.p.p2.p21.2')}</li>
                            <li>{t('privacy:choices.p.p2.p21.3')}</li>
                            <li>{t('privacy:choices.p.p2.p21.4')}</li>
                        </ul>
                        <p>{t('privacy:choices.p.p3')}</p>
                        <br/>
                        <p>{t('privacy:choices.p.p4')}</p>
                    </p>
                    <br/>
                    <h2>{t('privacy:updates_to_our_privacy_policy.title')}</h2>
                    <p>{t('privacy:updates_to_our_privacy_policy.p')}</p>
                    <br/>
                    <h2>{t('privacy:contact_us.title')}</h2>
                    <p>{t('privacy:contact_us.p')}</p>
                </Trans>
            </div>
        </Modal>
    )
}

export default PrivacyPolicyModal;