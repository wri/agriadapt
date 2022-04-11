import Layout from "layout/layout/layout-app";
// import IntroContainerHome from './home-intro-container/component';
import MapContainerHome from './home-map-container/component';
import ValueChainsContainerHome from './home-value-chains-container/component';
import AnalysisContainerHome from './home-analysis-container/component';
import LearnMoreContainerHome from './home-learn-more-container/component'
import IntroHeader from "layout/intro-header";
import { LANDING } from "layout/intro-header/constants";

const LayoutHome = () => {

  return (
    <Layout title="Home">
      <div className="l-home">
        <IntroHeader {...LANDING} />
        <MapContainerHome />
        <ValueChainsContainerHome />
        <AnalysisContainerHome />
        <LearnMoreContainerHome />
      </div>
    </Layout>
  );
};

export default LayoutHome;
