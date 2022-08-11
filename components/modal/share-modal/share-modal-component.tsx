import React, { useEffect, useRef, useState } from 'react';
import { toastr } from 'react-redux-toastr';

// components
import Icon from 'components/ui/icon';
// import Spinner from 'components/ui/Spinner';

interface ShareModalComponentProps {
  links: Record<string, any>;
  shortLinks?: Record<string, any>;
  loading?: boolean;
  analytics?: {
    facebook: (type: string) => void;
    twitter: (type: string) => void;
    email: (type: string) => void;
    copy: (type: string) => void;
  };
  fetchShortUrl?: () => void;
  resetShortLinks?: () => void;
}

const ShareModalComponent = ({
  links = {},
  shortLinks,
  // loading = true,
  // fetchShortUrl,
  resetShortLinks,
  analytics = {
    facebook: () => undefined,
    twitter: () => undefined,
    email: () => undefined,
    copy: () => undefined,
  },
}: ShareModalComponentProps) => {
  const inputs = useRef<Record<string, HTMLInputElement>>({});
  const [copied, setCopied] = useState({});

  useEffect(() => {
    if (links.link) {
      // fetchShortUrl({ longUrl: links.link });
    }

    return () => {
      resetShortLinks();
    };
  }, [links.link, resetShortLinks]);

  const onCopyClick = (type: string) => {
    const input = inputs.current[type];
    input.select();

    try {
      document.execCommand('copy');

      setCopied({
        ...copied,
        [type]: true,
      });

      analytics.copy(type);

      setTimeout(() => {
        setCopied({
          ...copied,
          [type]: false,
        });
      }, 1000);
    } catch (err) {
      toastr.warning('Oops, unable to copy');
    }
  };

  return (
    <div className="c-share-modal">
      <h2>Share</h2>

      <div className="share-content">
        {Object.keys(links).map((type) => {
          const htmlFor = `share-${type}`;
          const url = (shortLinks && shortLinks[type]) || links[type];

          switch (type) {
            case 'link':
              return (
                <div key={type} className="c-field">
                  <label htmlFor={htmlFor}>Public url to share</label>

                  <div className="share-input-container">
                    {/* {loading && <Spinner className="-light -tiny" isLoading />} */}

                    <input
                      ref={(n) => (inputs.current[type] = n)}
                      id={htmlFor}
                      name={htmlFor}
                      className="share-input"
                      value={url}
                      readOnly
                    />

                    <div className="share-buttons">
                      <a
                        className="c-btn -secondary -compressed -square"
                        href={`mailto:?subject=Shared from AgriAdapt&body= I thought you'd be interested in what I found on AgriAdapt: ${url}`}
                        onClick={() => analytics.email(type)}
                      >
                        <Icon name="icon-email" className="-small" />
                      </a>

                      <a
                        className="c-btn -secondary -compressed -square"
                        href={`http://www.facebook.com/sharer/sharer.php?u=${url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => analytics.facebook(type)}
                      >
                        <Icon name="icon-facebook" className="-small" />
                      </a>

                      <a
                        className="c-btn -secondary -compressed -square"
                        href={`https://twitter.com/share?url=${url}&text=${encodeURIComponent(
                          document.title
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => analytics.twitter(type)}
                      >
                        <Icon name="icon-twitter" className="-small" />
                      </a>

                      <a
                        className="c-btn -secondary -compressed"
                        tabIndex={0}
                        role="button"
                        onClick={() => onCopyClick(type)}
                      >
                        {copied[type] ? 'Copied' : 'Copy link'}
                      </a>
                    </div>
                  </div>
                </div>
              );

            case 'embed':
              return (
                <div key={type} className="c-field">
                  <label htmlFor={htmlFor}>Code to embed</label>

                  <div className="share-input-container">
                    <input
                      ref={(n) => (inputs.current[type] = n)}
                      id={htmlFor}
                      name={htmlFor}
                      className="share-input"
                      value={`<iframe src="${url}" width="100%" height="500px" frameBorder="0" />`}
                      readOnly
                    />

                    <div className="share-buttons">
                      <a
                        className="c-btn -secondary -compressed"
                        tabIndex={0}
                        role="button"
                        onClick={() => onCopyClick(type)}
                      >
                        {copied[type] ? 'Copied' : 'Copy link'}
                      </a>
                    </div>
                  </div>
                </div>
              );

            default:
              return null;
          }
        })}
      </div>
    </div>
  );
};

export default ShareModalComponent;
