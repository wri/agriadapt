import React from 'react'
import { INTRO } from "../pageContent";

const IntroContainerHome = () => {

    return (
        <div className="intro-container">
            <div className='intro-image'>
                {/* <img src='static/images/components/layout/intro-hero.svg' alt='intro-hero' height='auto' width='100%'/> */}
                <img src='static/images/components/layout/intro-hero.svg' alt='intro-hero' />
            </div>
            <div className="intro-text-container">
                <h2>{INTRO.title}</h2>
                <h3>{INTRO.subTitle}</h3>
                <div className="intro-button-container">
                    <button className="c-button -primary">
                        {INTRO.button}
                    </button>
                </div>
            </div>
        </div>
    )
};

export default IntroContainerHome;