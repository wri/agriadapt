import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
// import loader from 'lib/imageLoader';
// import mapImage from 'public/images/components/layout/landing/map.png';

import { LEARN } from '../constants';

const LearnMoreContainerHome = () => {
  const { t } = useTranslation();
  const { button } = LEARN;
  return (
    <div className="learn-more-container">
      <div>
        <h2>{t(LEARN.title)}</h2>
        <h3>{t(LEARN.subTitle)}</h3>
        <Link href={button.url} passHref>
          <a className="c-button -primary">{t(button.label)}</a>
        </Link>
      </div>
      <div className="learn-more-image-container">
        {/* <Image loader={loader} src={LEARN.image} alt="about-image" /> */}
        <Image loader={({ src }) => src} src={LEARN.image} alt="about-image" />
      </div>
    </div>
  );
};

export default LearnMoreContainerHome;
