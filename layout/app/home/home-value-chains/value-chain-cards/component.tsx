import loader from 'lib/imageLoader';
import { Media } from 'lib/media';
import Image from 'next/image';
import Link from 'next/link';
import mobileBlob from 'public/images/components/layout/landing/value-chain-cards/mobile-blob.svg';

import { VALUECHAINS } from '../../constants';

export const ValueChainCards = () => {
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
            <button key={c.label} className="c-button -secondary">
              {`Explore the ${c.label} Value Chain`}
            </button>
          ))}
        </div>
      </Media>

      <Media greaterThanOrEqual="md">
        <div className="c-value-chain-cards">
          {VALUECHAINS.chains.map((c) => (
            <div key={c.label} className={'value-chain-card'}>
              <div className="c-image">
                <Image loader={loader} src={c.image} alt={c.label} />
              </div>
              <div className="c-value-chain-card-info">
                <h2>{c.label}</h2>
                <Link passHref href={`/value-chains/${c.href}`}>
                  <a className="c-button -secondary -fullwidth">
                    {`Explore the ${c.label} Value Chain`}
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
