import React from 'react'
import { MAP } from "../constants";
import { Media } from "lib/media";
import Image from 'next/image';
import loader from 'lib/imageLoader';

const MapContainerHome = () => {


    return (
      <div className="map-container">
        <div className="map-text-container">
          <h2>{MAP.title}</h2>
          <h3>{MAP.subTitle}</h3>
          <button className="c-button -primary">{MAP.button}</button>
        </div>
        <div className="map-image-container">
          <Media at="sm">
            <Image loader={loader} src={MAP.image_sm} alt={MAP.image_alt} />
          </Media>
          <Media greaterThanOrEqual="md">
            <Image loader={loader} src={MAP.image_md} alt={MAP.image_alt} />
          </Media>
        </div>
      </div>
    );
};

export default MapContainerHome;