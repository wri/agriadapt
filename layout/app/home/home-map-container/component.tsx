import React from 'react'
import { MAP } from "../pageContent";
import { Media } from "lib/media";

const MapContainerHome = () => {


    return (
        <div className='map-container'>
            <div className='map-text-container'>
                <h2>{MAP.title}</h2>
                <h3>{MAP.subTitle}</h3>
                <div className="intro-button-container">
                    <button className="c-button -primary">
                        {MAP.button}
                    </button>
                </div>
            </div>
            <div className="map-image-container" >
                <Media at='sm'>
                    <img src="/static/images/components/layout/map-container-image-mobile.svg" alt='map-image' />    
                </Media>
                <Media greaterThanOrEqual='md'>
                    <img src="/static/images/components/layout/map-container-image.svg" alt='map-image' />    
                </Media>
            </div>
        </div>
    )
};

export default MapContainerHome;