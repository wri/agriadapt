import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { LEARN } from '../constants';

const LearnMoreContainerHome = () => {
  const { button } = LEARN;
  return (
    <div className="learn-more-container">
      <div>
        <h2>{LEARN.title}</h2>
        <h3>{LEARN.subTitle}</h3>
        <Link href={button.url} passHref>
          <a className="c-button -primary">{button.label}</a>
        </Link>
      </div>
      <div className="learn-more-image-container">
        <Image loader={({ src }) => src} src={LEARN.image} alt="about-image" />
      </div>
    </div>
  );
};

export default LearnMoreContainerHome;
