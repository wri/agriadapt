import React from 'react';
import IntroHeader from 'layout/intro-header';
import NavigationControls from './content/navigation-controls';
import HazardsIntro from './content/hazards-intro';
import StepDetails from './content/step-details';
import UserStories from './content/user-stories';
import Layout from 'layout/layout/layout-app';
import { capitalizeFirstLetter } from 'utils/utils';

interface LayoutCropProps {
  header: any;
  countries: {
    label: string;
    value: string;
    iso: string;
  }[];
  details: any;
  quotes: Record<string, any>[];
  crop: 'rice' | 'cotton' | 'coffee';
  setActiveCrop: (crop: 'rice' | 'cotton' | 'coffee') => void;
  setCountry: (country: Record<'label' | 'value' | 'iso', string>) => void;
}

const LayoutCrop = ({
  header,
  details,
  countries,
  crop,
  quotes,
}: LayoutCropProps) => {
  return (
    // TODO: Translate
    <Layout title={capitalizeFirstLetter(crop)}>
      <div className="l-crop">
        <IntroHeader {...header} countries={countries} />
        <div className="l-container">
          <div className="row">
            <div className="column small-12">
              <UserStories quotes={quotes} />
            </div>
          </div>
        </div>
        <div className="l-container">
          <div className="row">
            <HazardsIntro crop={crop} />
          </div>
        </div>
        <div className="l-container">
          <div className="row">
            <NavigationControls details={details} />
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
