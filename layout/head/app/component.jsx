import PropTypes from 'prop-types';
import HeadNext from 'next/head';

export default function HeadApp({ title, description, thumbnail }) {

  const url =
    typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}` : '';

  return (
    <>
      <HeadNext>
        <title>{title ? `${title} | Climate Risk Tool` : 'Climate Risk Tool'}</title>

        <meta property="og:url" content={url} />
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta name="og:image" content={thumbnail} />
        <meta property="og:image:secure_url" content={thumbnail} />
        <meta name="og:image:alt" content={`${title}_widget`} />
      </HeadNext>
    </>
  );
}

HeadApp.defaultProps = {
  title: null,
  description: null,
  thumbnail: 'https://resourcewatch.org/static/images/social-big.jpg',
};

HeadApp.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  thumbnail: PropTypes.string,
};
