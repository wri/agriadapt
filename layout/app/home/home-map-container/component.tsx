import React from 'react'


const MapContainerHome = () => {


    return (
        <div className='map-container'>
            <div className='map-text-container'>
                <h2>Here's a more compelling header for the map experience.</h2>
                <h3>Here's a subheader that provides additional contextual information.</h3>
                <div className="intro-button-container">
                    <button className="c-button -primary">
                        CTA for the Map
                    </button>
                </div>
            </div>
            <div className="map-image-container" >
                <img src="/static/images/components/layout/map-container-image.svg" alt='map-image' />    
            </div>
        </div>
    )
};

export default MapContainerHome;