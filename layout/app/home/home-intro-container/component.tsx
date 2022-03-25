import React from 'react'

const IntroContainerHome = () => {

    return (
        <div className="intro-container">
            <div className='intro-image'>
                {/* <img src='static/images/components/layout/intro-blob.svg' alt='intro-blob'/> */}
                <img src='static/images/components/layout/intro-wheat.svg' alt='intro-wheat'/>
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