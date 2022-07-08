import IntroHeader from 'layout/intro-header';
import NavigationControls from './content/navigation-controls';
import HazardsIntro from './content/hazards-intro';
import StepDetails from './content/step-details';
import ItemIntro from './content/item-intro';
import UserStories from './content/user-stories';
import Layout from 'layout/layout/layout-app';

interface LayoutCropProps {
  header: any;
  countries: {
    label: string;
    value: string;
    geostore: string;
  }[];
  details: {
    inputs: any;
    production: any;
    processing?: any;
    trade: any;
  }
}

const LayoutCrop = ({ header, details, countries }: LayoutCropProps) => {
  return (
    // TODO: Translate
    <Layout title={'Value Chains'}>
      <div className="l-crop">
        <IntroHeader {...header} countries={countries} />
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
            <NavigationControls details={details}/>
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
              <StepDetails details={details} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LayoutCrop;
