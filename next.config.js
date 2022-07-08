module.exports = {
  reactStrictMode: true,

  images: {
    loader: 'custom',
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
