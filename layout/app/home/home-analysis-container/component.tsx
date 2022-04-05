import React from 'react'
import Carousel from 'nuka-carousel';
import { Media } from "lib/media";
import { ANALYSIS } from '../pageContent';

const AnalysisContainerHome = () => {

  const cards = ['card1', 'card2', 'card3', 'card4'];

  const getAnalysisCard = (item) => {
    return (
      <div className='analysis-card-container'>
        <h3>{ANALYSIS[item].title}</h3>
        <div className='analysis-card-button-container'>
          <button className="c-button -primary">
            {ANALYSIS[item].button}
          </button>
        </div>
        <img src='static/images/components/layout/analysis-map.svg' alt='analysis-map' />
      </div>
    );
  };

  return (
    <div className="analysis-container">
      <div className="analysis-text-container">
        <h2>{ANALYSIS.title}</h2>
        <h3>{ANALYSIS.subTitle}</h3>
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
              {cards.map((item) => getAnalysisCard(item))}
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
              {cards.map((item) => getAnalysisCard(item))}
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
              {cards.map((item) => getAnalysisCard(item))}
            </Carousel>
          </Media>

        </div>
      </div>
    </div>
  );
};

export default AnalysisContainerHome;