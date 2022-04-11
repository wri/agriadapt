import React from 'react';
import Carousel from 'nuka-carousel';
import { Media } from 'lib/media';
import { ANALYSIS } from '../constants';
import AnalysisCard from './analysis-card/component';

const AnalysisContainerHome = () => {
  return (
    <div className="analysis-container">
      <div className="analysis-text-container">
        <h2>{ANALYSIS.title}</h2>
        <h3>{ANALYSIS.subTitle}</h3>
        {['sm', 'md', 'lg'].map((b: 'sm' | 'md' | 'lg', i) => (
          <Media
            key={b}
            {...(['sm', 'md'].includes(b)
              ? { at: b }
              : { greaterThanOrEqual: b })}
          >
            <div className="c-carousel">
              <Carousel
                renderCenterLeftControls={() => undefined}
                renderCenterRightControls={() => undefined}
                slidesToShow={i + 1}
                cellAlign="left"
                autoplay={true}
                wrapAround={true}
              >
                {ANALYSIS.cards.map((c) => (
                  <AnalysisCard
                    key={i}
                    image_alt={ANALYSIS.image_alt}
                    {...c}
                  />
                ))}
              </Carousel>
            </div>
          </Media>
        ))}
      </div>
    </div>
  );
};

export default AnalysisContainerHome;
