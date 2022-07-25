import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { LEARN } from '../constants';

const LearnMoreContainerHome = () => {
  const router = useRouter();
  const { button } = LEARN;
  return (
    <div className="learn-more-container">
      <div>
        <h2>{LEARN.title}</h2>
        <h3>{LEARN.subTitle}</h3>
        <button
          className="c-button -primary"
          onClick={() => router.push(button.url)}
        >
          {button.label}
        </button>
      </div>
      <div className="learn-more-image-container">
        <Image loader={({ src }) => src} src={LEARN.image} alt="about-image" />
      </div>
    </div>
  );
};

export default LearnMoreContainerHome;
