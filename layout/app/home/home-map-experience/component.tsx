import React from 'react';
import { MAP } from '../constants';
import { Media } from 'lib/media';
import Image from 'next/image';
import loader from 'lib/imageLoader';
import mapImage from 'public/images/components/layout/landing/map.png';
import layerPanelImage from 'public/images/components/layout/landing/layer-panel.png';
import legendImage from 'public/images/components/layout/landing/legend.svg';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

const MapContainerHome = () => {
  const { t } = useTranslation();
  const { button } = MAP;
  return (
    <div className="c-map-experience">
      <div className="map-text-container">
        <h2>{t(MAP.title)}</h2>
        <h3>{t(MAP.subTitle)}</h3>
        <Link href={button.url} passHref>
          <a className="c-button -primary">{t(button.label)}</a>
        </Link>
      </div>
      <Media at="sm">
        <div className="c-map-image">
          <Image loader={loader} src={MAP.image_sm} alt={t(MAP.image_alt)} />
        </div>
      </Media>
      <Media greaterThanOrEqual="md">
        <div className="c-map-image">
          <Image loader={loader} src={mapImage} alt={t(MAP.image_alt)} />
          <div className="layer-panel">
            <Image
              loader={loader}
              src={layerPanelImage}
              alt={t(MAP.image_alt)}
            />
          </div>
          <div className="legend">
            <Image loader={loader} src={legendImage} alt={t(MAP.image_alt)} />
          </div>
        </div>
      </Media>
    </div>
  );
};

export default MapContainerHome;
