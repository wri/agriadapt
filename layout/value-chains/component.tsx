import IntroHeader from 'layout/intro-header';
import NavigationControls from './content/navigation-controls';
import HazardsIntro from './content/hazards-intro';
import StepDetails from './content/step-details';
import ItemIntro from './content/item-intro';
import UserStories from './content/user-stories';
import Layout from 'layout/layout/layout-app';
import { useEffect } from 'react';

interface LayoutCropProps {
  header: any;
  countries: {
    label: string;
    value: string;
    iso: string;
  }[];
  details: {
    inputs: any;
    production: any;
    processing?: any;
    trade: any;
  };
  crop: 'rice' | 'cotton' | 'coffee';
  setActiveCrop: (crop: 'rice' | 'cotton' | 'coffee') => void;
  setCountry: (country: Record<'label' | 'value' | 'iso', string>) => void;
}

const LayoutCrop = ({
  header,
  details,
  countries,
  crop,
  setActiveCrop,
  setCountry,
}: LayoutCropProps) => {
  useEffect(() => {
    setActiveCrop(crop);
    if (['rice', 'cotton'].includes(crop))
      setCountry({
        label: 'India',
        value: '45d0f6f887a18df373fa69c3eb6f13c7',
        iso: 'IND',
      });
    else
      setCountry({
        label: 'Colombia',
        value: '298fc2cf079fb1439a4ad816d258a965',
        iso: 'COL',
      });
  }, [crop, setActiveCrop, setCountry]);
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
            <NavigationControls details={details} />
          </div>
        </div>
        {/* <div className="l-container">
          <div className="row">
            <ItemIntro />
          </div>
        </div> */}
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
