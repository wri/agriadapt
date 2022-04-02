import Layout from "layout/layout/layout-app";
// import IntroContainerHome from './home-intro-container/component';
import MapContainerHome from './home-map-container/component';
import ValueChainsContainerHome from './home-value-chains-container/component';
import AnalysisContainerHome from './home-analysis-container/component';
import LearnMoreContainerHome from './home-learn-more-container/component'
import ContentHeader from "layout/content-header";
import { LANDING } from "layout/content-header/constants";

const LayoutHome = () => {

  return (
    <Layout title="Home" className="l-home">
      <main>
        <ContentHeader {...LANDING} />
        <MapContainerHome />
        <ValueChainsContainerHome />
        <AnalysisContainerHome />
        <LearnMoreContainerHome />
      </main>
    </Layout>
  );
};

export default LayoutHome;
