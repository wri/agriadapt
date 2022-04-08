import React from 'react';
import { VALUECHAINS } from '../constants';
import { ValueChainCards } from './value-chain-cards/component';

const ValueChainsContainerHome = () => {
  return (
    <div className="value-chains-container">
      <div className="value-chains-text-container">
        <h2>{VALUECHAINS.title}</h2>
        <h3>{VALUECHAINS.subTitle}</h3>
      </div>
      <ValueChainCards />
    </div>
  );
};

export default ValueChainsContainerHome;
