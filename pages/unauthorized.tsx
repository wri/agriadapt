import React from 'react';

import LayoutError from 'layout/error';
import HeadError from 'layout/head/error';

const LayoutUnauthorized = () => {
  return (
    <>
      <HeadError title="Unauthorized" />
      <LayoutError
        statusCode={403}
        description="This page is unauthorized in your region"
      />
    </>
  );
};

export default LayoutUnauthorized;
