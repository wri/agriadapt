import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'nuka-carousel';

const defaultSettings = {
  slidesToShow: 7,
  slidesToScroll: 7,
  dragging: true,
  autoplay: true,
  autoplayInterval: 3500,
  initialSlideHeight: 56,
  wrapAround: true,
  renderTopCenterControls: () => {},
  renderCenterLeftControls: () => {},
  renderCenterRightControls: () => {},
  renderBottomCenterControls: () => {},
};

interface CarouselProps {
  settings: {  
    slidesToShow: 'number',
    slidesToScroll: 'number',
    dragging: 'boolean',
    autoplay: 'boolean',
    autoplayInterval: 'number',
    initialSlideHeight:'number',
    wrapAround: 'boolean',
    renderTopCenterControls: 'function',
    renderCenterLeftControls: 'function',
    renderCenterRightControls: 'function',
    renderBottomCenterControls: 'function'
  },
  items: any[]
}

function Carousel<CarouselProps>({ settings = defaultSettings, items = [] }) {
  if (typeof window !== "undefined") {
    if (window.innerWidth < 720) {
      settings.slidesToShow = 2;
      settings.slidesToScroll = 2;
    }
  }

  return (
    <div className="c-carousel">
      <Slider {...settings}>
        {items.map((item) => item)}
      </Slider>
    </div>
  );
}

Carousel.propTypes = {
  items: PropTypes.array.isRequired,
  settings: PropTypes.object,
};

export default Carousel;
