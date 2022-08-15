const { i18n } = require('./next-i18next.config');

module.exports = {
  reactStrictMode: true,

  images: {
    loader: 'custom',
  },

  i18n,

  async redirects() {
    return [
      // {
      //   source: '/((?!maintenance)(?!_next)(?!static).*)',
      //   destination: '/maintenance',
      //   permanent: false,
      // },
      {
        source: '/crops',
        destination: '/crops/rice',
        permanent: true,
      },
    ];
  },
};
