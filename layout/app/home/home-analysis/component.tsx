import React from 'react';
import Carousel from 'nuka-carousel';
import { Media } from 'lib/media';
import { ANALYSIS } from '../constants';
import AnalysisCard from './analysis-card/component';

const AnalysisContainerHome = () => {
  return (
    <div className="c-home-analysis">
      <div className="l-container">
        <div className="row">
          <div className="column">
            <h2>{ANALYSIS.title}</h2>
            <h3>{ANALYSIS.subTitle}</h3>
            {['sm', 'md', 'lg', 'xl'].map((b: 'sm' | 'md' | 'lg' | 'xl', i) => (
              <Media
                key={b}
                {...(['sm', 'md', 'lg'].includes(b)
                  ? { at: b }
                  : { greaterThanOrEqual: b })}
              >
                <div className="c-carousel">
                  <Carousel
                    renderCenterLeftControls={() => undefined}
                    renderCenterRightControls={() => undefined}
                    slidesToShow={['sm', 'md'].includes(b) ? i + 1 : i}
                    cellAlign="left"
                    slidesToScroll={1}
                    cellSpacing={20}
                    autoplay={true}
                    // wrapAround={true}
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
      </div>
    </div>
  );
};

export default AnalysisContainerHome;
