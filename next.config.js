module.exports = {
  reactStrictMode: true,

  images: {
    loader: 'custom',
  },

  i18n: {
    locales: ['en', 'es', 'ta', 'te'],
    defaultLocale: 'en',
  },

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
