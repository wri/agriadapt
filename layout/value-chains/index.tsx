import React from 'react';
import IntroHeader from 'layout/intro-header';
import NavigationControls from './content/navigation-controls';
import HazardsIntro from './content/hazards-intro';
import StepDetails from './content/step-details';
import UserStories from './content/user-stories';
import Layout from 'layout/layout/layout-app';
import { capitalizeFirstLetter } from 'utils/utils';
import { connect } from 'react-redux';
import { RootState } from 'lib/store';
import { StaticImageData } from 'next/image';

interface LayoutCropProps {
  header: any;
  country: {
    label: string;
    value: string;
    iso: string;
  }
  countries: {
    label: string;
    value: string;
    iso: string;
  }[];
  details: any;
  quotes: {
    location: string;
    image: StaticImageData;
    title: string;
    quote: string;
  }[];
  crop: 'rice' | 'cotton' | 'coffee';
}

const LayoutCrop = ({
  header,
  details,
  country,
  countries,
  crop,
  quotes,
}: LayoutCropProps) => {
  return (
    // TODO: Translate
    <Layout title={`${capitalizeFirstLetter(crop)} (${country.label})`}>
      <div className="l-crop">
        <IntroHeader crop={crop} {...header} countries={countries} />
        <div className="l-container">
          <div className="row">
            <div className="column small-12">
              <UserStories crop={crop} quotes={quotes} />
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

export default connect((state: RootState) => ({
  country: state.value_chains.country,
}))(LayoutCrop);
