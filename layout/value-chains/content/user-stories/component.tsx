import React from 'react';
import { Media } from 'lib/media';
import Image, { StaticImageData } from 'next/image';
import loader from 'lib/imageLoader';
import Carousel from 'nuka-carousel';
import chevronLeft from 'public/images/icons/chevronLeft.svg';
import chevronRight from 'public/images/icons/chevronRight.svg';
import { Trans, useTranslation } from 'next-i18next';

const UserStories = ({
  quotes,
  crop,
}: {
  quotes: {
    location: string;
    image: StaticImageData;
    title: string;
    quote: string;
  }[];

  crop: 'rice' | 'coffee' | 'cotton';
}) => {

  const { t } = useTranslation([crop, 'common']);

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
          <h3>{`${t(s.title)}, ${t(s.location)}`}</h3>
          <Trans >
            <em><p>{`${t(s.quote)}`}</p></em>
          </Trans>
          {/* <Link href="/explore" passHref>
            <a
              className={classnames({
                'c-button': true,
                '-primary': true,
              })}
            >
              {'Find Out More in the Map'}
            </a>
          </Link> */}
        </div>
      </div>
    ));
  };

  return (
    <div className="c-user-stories">
      <h2>{t(`common:hear_from_our_users`)}</h2>
      <div className="c-user-stories-body">
        {['sm', 'md', 'lg', 'xl'].map((b: 'sm' | 'md' | 'lg' | 'xl') => (
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
                      src={chevronLeft}
                      alt={t('common:Back')}
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
                      src={chevronRight}
                      alt={t('common:Next')}
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
