import React from 'react'
import Carousel from 'nuka-carousel';

const AnalysisContainerHome = () => {

    // const settings = {
    //     // slidesToShow: 3,
    //     // slidesToScroll: 3,
    //     cellAlign: "right",
    //     speed: 3000,
    //     // dragging: true,
    //     // autoplay: true,
    //     // autoplayInterval: 3500,
    //     // initialSlideHeight: 56,
    //     // wrapAround: true,
    //     // renderTopCenterControls: () => { },
    //     // renderCenterLeftControls: () => { },
    //     // renderCenterRightControls: () => { },
    //     // renderBottomCenterControls: ({ previousSlide, currentSlide, nextSlide }) => (
    //     //     <button onClick={currentSlide}>Current</button>
    //     // ),
    // }
    const getAnalysisCard = () => {
        return (
            <div className='analysis-card-container'>
                <h3>Understand how climate hazards affect coffee production around the world</h3>
                <div className='analysis-card-button-container'>
                    <button className="c-button -primary">
                        Check out the data
                    </button>
                </div>
                <img src ='static/images/components/layout/analysis-map.svg' alt='analysis-map' />
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
            <Carousel
              renderCenterLeftControls={() => {}}
              renderCenterRightControls={() => {}}
              slidesToShow={3}
              cellAlign="right"
              autoplay={true}
              wrapAround= {true}
            >
              {[
                getAnalysisCard(),
                getAnalysisCard(),
                getAnalysisCard(),
                getAnalysisCard(),
              ].map((item) => item)}
            </Carousel>
          </div>
        </div>
      </div>
    );
};

export default AnalysisContainerHome;