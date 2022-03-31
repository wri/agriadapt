import React from 'react'
import { Media } from "lib/media";

const IntroContainerHome = () => {

    return (
        <div className="intro-container">
            <div className='intro-image'>
                <img src='static/images/components/layout/intro-hero.svg' alt='intro-hero' />
                {/* <Media at='sm'>
                    <img src='static/images/components/layout/intro-hero.svg' alt='intro-hero' height='629px' width='882px' />
                </Media>
                <Media at='md'>
                    <img src='static/images/components/layout/intro-hero.svg' alt='intro-hero' height='805px' width='1130px' />
                </Media>
                <Media greaterThanOrEqual='lg'>
                    <img src='static/images/components/layout/intro-hero.svg' alt='intro-hero' height='1139.02px' width='1597.95px' />
                </Media> */}
                
            </div>
            <div className="intro-text-container">
                <h2>Helping farmers and agriculture businesses around the world adapt to climage change.</h2>
                <h3>Data and tools for agricultureal resilience</h3>
                <div className="intro-button-container">
                    <button className="c-button -primary">
                        Explore the Latest Data
                    </button>
                </div>
            </div>
        </div>
    )
};

export default IntroContainerHome;