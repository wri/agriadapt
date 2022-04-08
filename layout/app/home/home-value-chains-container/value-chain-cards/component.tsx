import loader from "lib/imageLoader";
import { Media } from "lib/media"
import Image from "next/image";
import valueChainBlob from 'public/static/images/components/layout/landing/valuechain-blob.svg';
import { VALUECHAINS } from "../../constants";

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
                src={valueChainBlob}
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
                <Image loader={loader} src={c.image} alt={c.label} />
                <div className="value-chain-card-text-container">
                  <h2>{c.label}</h2>
                  <button className="c-button -secondary">
                    {`Explore the ${c.label} Value Chain`}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Media>
      </>
    );
}