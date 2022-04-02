module.exports = {
  reactStrictMode: true,

  // eslint: {
  //   // Will remove one day
  //   ignoreDuringBuilds: true,
  // },
  images: {
    loader: 'custom',
  },

  async redirects() {
    return [
      {
        source: '/value-chains',
        destination: '/value-chains/coffee/colombia',
        permanent: false,
      },
      {
        source: '/value-chains/coffee',
        destination: '/value-chains/coffee/colombia',
        permanent: false,
      },
      {
        source: '/value-chains/cotton',
        destination: '/value-chains/cotton/india',
        permanent: false,
      },
      {
        source: '/value-chains/rice',
        destination: '/value-chains/rice/india',
        permanent: false,
      },
    ];
  },
};
