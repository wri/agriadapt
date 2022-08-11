import { useTranslation } from 'next-i18next';
import React from 'react';
import { VALUECHAINS } from '../constants';
import { ValueChainCards } from './value-chain-cards/component';

const ValueChainsContainerHome = () => {
  const {t} = useTranslation();

  return (
    <div className="c-value-chains">
      <div className="value-chains-text-container">
        <h2>{t(VALUECHAINS.title)}</h2>
        <h3>{t(VALUECHAINS.subTitle)}</h3>
      </div>
      <ValueChainCards />
    </div>
  );
};

export default ValueChainsContainerHome;
