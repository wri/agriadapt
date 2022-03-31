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
    }

    const getValueChainCardContainer = (breakpoint: string) => {
        // let grid = {}
        // if (breakpoint === 'sm') {
        //     grid = {
        //         width: '100%',
        //         display: 'grid',
        //         gridTemplateColumns: '100%',
        //         gridRow: 'auto',
        //         gridRowGap: '3%'
        //     };
        // } else if (breakpoint === 'md') {
        //     grid = {
        //         width: '100%',
        //         display: 'grid',
        //         gridTemplateColumns: '50% 50%',
        //         gridRow: 'auto auto',
        //         gridColumnGap: '10%'
        //     };
        // } else {
        //     grid = {
        //         width: '100%',
        //         display: 'grid',
        //         gridTemplateColumns: '30% 30% 30%',
        //         gridRow: 'auto auto auto',
        //         gridColumnGap: '3%'
        //     };
        // }

        return (
            <div className='value-chain-cards-container'>
                {getValueChainCard('Rice', breakpoint)}
                {getValueChainCard('Cotton', breakpoint)}
                {getValueChainCard('Coffee', breakpoint)}
            </div>
        )
    }
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