import React from 'react'
import Carousel from 'nuka-carousel';
import { Media } from "lib/media";

const AnalysisContainerHome = () => {

  const getAnalysisCard = () => {
    return (
      <div className='analysis-card-container'>
        <h3>Understand how climate hazards affect coffee production around the world</h3>
        <div className='analysis-card-button-container'>
          <button className="c-button -primary">
            Check out the data
          </button>
        </div>
        <img src='static/images/components/layout/analysis-map.svg' alt='analysis-map' />
      </div>
    );
  };

  return (
    <div className="analysis-container">
      <div className="analysis-text-container">
        <h2>Here's a more compelling header for the analysis experience.</h2>
        <h3>
          Here's a subheader that provides additional contextual information.
        </h3>
        <div className="c-carousel">
          <Media at='sm'>
          <Carousel
              renderCenterLeftControls={() => { }}
              renderCenterRightControls={() => { }}
              slidesToShow={1}
              cellAlign="right"
              autoplay={true}
              wrapAround={true}
            >
              {[
                getAnalysisCard(),
                getAnalysisCard(),
                getAnalysisCard(),
                getAnalysisCard(),
              ].map((item) => item)}
            </Carousel>
          </Media>
          <Media at='md'>
          <Carousel
              renderCenterLeftControls={() => { }}
              renderCenterRightControls={() => { }}
              slidesToShow={2}
              cellAlign="right"
              autoplay={true}
              wrapAround={true}
            >
              {[
                getAnalysisCard(),
                getAnalysisCard(),
                getAnalysisCard(),
                getAnalysisCard(),
              ].map((item) => item)}
            </Carousel>
          </Media>
          <Media greaterThanOrEqual='lg'>
            <Carousel
              renderCenterLeftControls={() => { }}
              renderCenterRightControls={() => { }}
              slidesToShow={3}
              cellAlign="right"
              autoplay={true}
              wrapAround={true}
            >
              {[
                getAnalysisCard(),
                getAnalysisCard(),
                getAnalysisCard(),
                getAnalysisCard(),
              ].map((item) => item)}
            </Carousel>
          </Media>

        </div>
      </div>
    </div>
  );
};

export default AnalysisContainerHome;