import React from 'react'
import { LEARN } from '../pageContent'

const LearnMoreContainerHome = () => {

    return (
        <div className='learn-more-container'>
            <div>
                <h2>{LEARN.title}</h2>
                <h3>{LEARN.subTitle}</h3>
                <button className="c-button -primary">
                    {LEARN.button}
                </button>
            </div>
            <div className='learn-more-image-container'>
                <img src='static/images/components/layout/learn-more.svg' alt='about-image' />
            </div>
        </div>
    )
};

export default LearnMoreContainerHome;