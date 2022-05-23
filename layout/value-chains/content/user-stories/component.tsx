import React from 'react';
import classnames from 'classnames';
import { Media } from 'lib/media';
import Image from 'next/image';
import loader from 'lib/imageLoader';
import Carousel from 'nuka-carousel';
import { user_stories } from '../constants';

const UserStories = ({ quotes }) => {
  const { header, stories } = user_stories;

  const getImageDimensions = (b, image) => {
    if (b === 'md') {
      return image ? '122px' : '142px';
    } else {
      return image ? '198px' : '218px';
    }
  };

  const slides = (b) => {
    return quotes.map((s, i) => (
      <div id={s.title} key={i} className="c-user-story">
        <div
          className="user-picture"
          style={{
            height: getImageDimensions(b, false),
            width: getImageDimensions(b, false),
          }}
        >
          <Image
            height={getImageDimensions(b, true)}
            width={getImageDimensions(b, true)}
            loader={loader}
            unoptimized
            src={s.image}
            alt={s.title}
          />
        </div>
        <div className="c-user-info">
          <h3>{`${s.title}, ${s.location}`}</h3>
          <p>{`"${s.quote}"`}</p>
          <button
            className={classnames({
              'c-button': true,
              '-primary': true,
            })}
          >
            {'Find Out More in Our Map'}
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div className="c-user-stories">
      {!!stories.length && (
        // TODO: Translate
        <h2>{header}</h2>
      )}
      <div className="c-user-stories-body">
        {['sm', 'md', 'lg', 'xl'].map((b: 'sm' | 'md' | 'lg' | 'xl', i) => (
          <Media
            key={b}
            {...(['sm', 'md', 'lg'].includes(b)
              ? { at: b }
              : { greaterThanOrEqual: b })}
          >
            <div className="c-carousel">
              <Carousel
                renderCenterLeftControls={({ currentSlide, goToSlide }) => (
                  <button onClick={() => goToSlide(currentSlide - 1)}>
                    <Image
                      height={'25px'}
                      width={'17px'}
                      loader={loader}
                      unoptimized
                      src={user_stories.chevronLeft}
                      alt={'left'}
                    />
                  </button>
                )}
                renderCenterRightControls={({ currentSlide, goToSlide }) => (
                  <button onClick={() => goToSlide(currentSlide + 1)}>
                    <Image
                      height={'25px'}
                      width={'17px'}
                      loader={loader}
                      unoptimized
                      src={user_stories.chevronRight}
                      alt={'right'}
                    />
                  </button>
                )}
                renderBottomCenterControls={() => null}
                slidesToShow={1}
                slidesToScroll={0}
                cellSpacing={20}
                autoplay={true}
                wrapAround={true}
                enableKeyboardControls={true}
                dragging={true}
              >
                {slides(b)}
              </Carousel>
            </div>
          </Media>
        ))}
      </div>
    </div>
  );
};

export default UserStories;
