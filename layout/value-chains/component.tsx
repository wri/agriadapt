import IntroHeader from 'layout/intro-header';
import HazardsFlow from './content/flow-diagram';
import HazardsIntro from './content/hazards-intro';
import StepDetails from './content/step-details/component';
import ItemIntro from './content/item-intro';
import UserStories from './content/user-stories';
import Layout from 'layout/layout/layout-app';

const LayoutCrop = ({ header, details }) => {
  return (
    // TODO: Translate
    <Layout title={'Value Chains'}>
      <div className="l-crop">
        <IntroHeader {...header} />
        <div className="l-container">
          <div className="row">
            <div className="column small-12">
              <UserStories />
            </div>
          </div>
        </div>
        <div className="l-container">
          <div className="row">
            <HazardsIntro />
          </div>
        </div>
        <div className="l-container">
          <div className="row">
            <HazardsFlow />
          </div>
        </div>
        <div className="l-container">
          <div className="row">
            <ItemIntro />
          </div>
        </div>
        <div className="l-container">
          <div className="row">
            <div className="column small-12">
              <StepDetails {...details} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LayoutCrop;
