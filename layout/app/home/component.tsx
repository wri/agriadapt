import Layout from 'layout/layout/layout-app';
import MapContainerHome from './home-map-experience/component';
import ValueChainsContainerHome from './home-value-chains/component';
import AnalysisContainerHome from './home-analysis/component';
import LearnMoreContainerHome from './home-learn-more-container/component';
import IntroHeader from 'layout/intro-header';
import { LANDING } from 'layout/intro-header/constants';
import TermsOfServiceModal from 'components/modal/tos-modal';
import PrivacyPolicyModal from 'components/modal/privacy-policy-modal';

const LayoutHome = ({ showTermsModal = false, showPrivacyModal = false }) => {
  return (
    <Layout title="Home">
      <div className="l-home">
        <IntroHeader {...LANDING} />
        <div className="l-container">
          <div className="row">
            <div className="column">
              <MapContainerHome />
            </div>
          </div>
        </div>
        <div className="l-container">
          <div className="row">
            <ValueChainsContainerHome />
          </div>
        </div>
        <AnalysisContainerHome />
        <div className="l-container">
          <div className="row">
            <LearnMoreContainerHome />
          </div>
        </div>
      </div>
      {showTermsModal && <TermsOfServiceModal />}
      {showPrivacyModal && <PrivacyPolicyModal />}
    </Layout>
  );
};

export default LayoutHome;
