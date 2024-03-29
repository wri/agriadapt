import loader from 'lib/imageLoader';
import { Media } from 'lib/media';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import mobileBlob from 'public/images/components/layout/landing/value-chain-cards/mobile-blob.svg';

import { VALUECHAINS } from '../../constants';

export const ValueChainCards = () => {
  const { t } = useTranslation(['landing', 'common']);
  return (
    <>
      <Media at="sm">
        <div className="c-value-chain-cards">
          <div className="c-mobile-blob">
            <Image
              unoptimized
              loader={loader}
              layout="fill"
              src={mobileBlob}
              alt="valuechain-blob"
            />
          </div>
          {VALUECHAINS.chains.map((c) => (
            <Link href={`/crops/${c.href}`} key={c.label} passHref>
              <a className="c-button -secondary">{t(c.label)}</a>
            </Link>
          ))}
        </div>
      </Media>

      <Media greaterThanOrEqual="md">
        <div className="c-value-chain-cards">
          {VALUECHAINS.chains.map((c) => (
            <div key={c.label} className={'value-chain-card'}>
              <div className="c-image">
                <Image loader={loader} src={c.image} alt={t(c.label)} />
              </div>
              <div className="c-value-chain-card-info">
                <h2>{t(c.label)}</h2>
                <Link passHref href={`/crops/${c.href}`}>
                  <a className="c-button -secondary -fullwidth">
                    {t(c.button_label)}
                  </a>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Media>
    </>
  );
};
