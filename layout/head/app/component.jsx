import PropTypes from 'prop-types';
import HeadNext from 'next/head';
import dynamic from 'next/dynamic';
import GoogleAnalyticsV4Script from 'scripts/google-analytics-v4';
import GoogleTagManagerScript from 'scripts/google-tag-manager';

const HotjarScript = dynamic(() => import('../../../scripts/hotjar'), {
  ssr: false,
});

export default function HeadApp({ title, description, thumbnail }) {
  const url =
    typeof window !== 'undefined'
      ? `${window.location.origin}${window.location.pathname}`
      : '';

  return (
    <>
      <HeadNext>
        <title>{title ? `${title} | AgriAdapt Beta` : 'AgriAdapt Beta'}</title>
        <meta property="og:url" content={url} />
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta name="og:image" content={thumbnail} />
        <meta property="og:image:secure_url" content={thumbnail} />
        <meta name="og:image:alt" content={`${title}_widget`} />
      </HeadNext>
      {process.env.NODE_ENV === 'production' && (
        <>
          <HotjarScript />
          <GoogleAnalyticsV4Script />
          <GoogleTagManagerScript />
        </>
      )}
    </>
  );
}

HeadApp.defaultProps = {
  title: null,
  description: null,
  thumbnail: 'https://agriadapt.org/images/social-big.jpg',
};

HeadApp.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  thumbnail: PropTypes.string,
};
