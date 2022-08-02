const { i18n } = require('./next-i18next.config');

module.exports = {
  reactStrictMode: true,

  images: {
    loader: 'custom',
  },

  i18n,

  async redirects() {
    return [
      {
        source: '/value-chains',
        destination: '/value-chains/rice',
        permanent: false,
      },
    ];
  },
};
