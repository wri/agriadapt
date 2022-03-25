import React, { FC, useEffect } from 'react';
import Carousel from 'nuka-carousel';
import { renderModule } from 'vega-lib';

const defaultSettings = {
  // slidesToShow: 7,
  // slidesToScroll: 7,
  dragging: true,
  autoplay: true,
  autoplayInterval: 3500,
  withoutControls: false,
  // initialSlideHeight: 56,
  wrapAround: true,
  // renderTopCenterControls: () => {},
  // renderCenterLeftControls: () => {},
  // renderCenterRightControls: () => {},
  // renderBottomCenterControls: () => {},

};

interface CarouselProps {
  settings: {
    slidesToShow: number,
    slidesToScroll: number,
    dragging: boolean,
    autoplay: boolean,
    autoplayInterval: number,
    initialSlideHeight: number,
    wrapAround: boolean,
    renderTopCenterControls: Function | void,
    renderCenterLeftControls: Function | void,
    renderCenterRightControls: Function | void,
    renderBottomCenterControls: Function | void
  },
  items: any[],
}

const CarouselWrapper: FC<CarouselProps> = ({ settings = defaultSettings, items = [] }) => {
  // if (typeof window !== "undefined") {
  //   if (window.innerWidth < 720) {
  //     settings.slidesToShow = 2;
  //     settings.slidesToScroll = 2;
  //   }
  // }

  const removePrevNextButtons = () => {
    let prevElement = document.querySelector('.slider-control-centerleft');
    let nextElement = document.querySelector('.slider-control-centerright');
    prevElement?.parentElement?.removeChild(prevElement);
    nextElement?.parentElement?.removeChild(nextElement);
  }

  useEffect(() => {
    removePrevNextButtons()
  }, [items]);

  return (
    <div className="c-carousel">
      <Carousel {...settings}>
        {items.map((item) => item)}
      </Carousel>
    </div>
  );
}

export default CarouselWrapper;
