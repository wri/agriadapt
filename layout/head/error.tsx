import React from 'react';
import HeadNext from 'next/head';

const HeadError = ({ title = 'Something went wrong' }: { title: string }) => {
  return (
    <HeadNext>
      <title>{`${title} | AgriAdapt`}</title>
      <meta name="robots" content="noindex, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </HeadNext>
  );
};

export default HeadError;
