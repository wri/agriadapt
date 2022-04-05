import React from 'react'
import { Media } from "lib/media";

const ValueChainsContainerHome = () => {

    const getValueChainCard = (valueChain: string, breakpoint: string) => {
        if (breakpoint === 'sm') {
            return (
                <div className='value-chain-card-mobile'>
                    <button className="c-button -primary">
                        {`Explore the ${valueChain} Value Chain`}
                    </button>
                </div>
            )
        } else {
            return (
                <div className={`value-chain-card-${valueChain}`}>
                    <img src={`static/images/components/layout/valuechain-${valueChain}.svg`} alt={valueChain} />
                    <div className='value-chain-card-text-container' >
                        <h2>{valueChain}</h2>
                        <div className='value-chain-card-button-container'>
                            <button className="c-button -primary">
                                {`Explore the ${valueChain} Value Chain`}
                            </button>
                        </div>
                    </div>
                </div>
            )
        }
    };

    const getValueChainCardContainer = (breakpoint: string) => {
        return (
            <>
                <div className='value-chains-mobile-image-container'>
                    {breakpoint === 'sm' && <img src='static/images/components/layout/valuechain-blob.svg' alt='valuechain-blob' />}
                </div>
                <div className='value-chain-cards-container'>
                    {getValueChainCard('Rice', breakpoint)}
                    {getValueChainCard('Cotton', breakpoint)}
                    {getValueChainCard('Coffee', breakpoint)}
                </div>
            </>
        )
    };

    return (
        <div className='value-chains-container'>
            <div className='value-chains-text-container'>
                <h2>Here's a more compelling header for the narrative experience.</h2>
                <h3>Here's a subheader that provides additional contextual information.</h3>
            </div>
            <Media at='sm'>
                {getValueChainCardContainer('sm')}
            </Media>
            <Media at='md'>
                {getValueChainCardContainer('md')}
            </Media>
            <Media greaterThanOrEqual='lg'>
                {getValueChainCardContainer('lg')}
            </Media>
        </div>
    )
};

export default ValueChainsContainerHome;