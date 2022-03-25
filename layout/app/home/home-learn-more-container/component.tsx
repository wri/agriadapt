import React from 'react'


const LearnMoreContainerHome = () => {


    return (
        <div className='learn-more-container'>
            <div>
                <h2>Learn more about the project</h2>
                <h3>The climate risk tool project is a initialtive by World Resource Institute. The beta version of the tool has been funded by Walmart Foundation.</h3>
                <button className="c-button -primary">
                    About [Project Name]
                </button>
            </div>
            <img src ='static/images/components/layout/learn-more.svg' alt ='about-image' />
        </div>
    )
};

export default LearnMoreContainerHome;