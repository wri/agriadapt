import React from 'react';

import LayoutError from 'layout/error';
import HeadError from 'layout/head/error';

const Layout404 = () => {
  return (
    <>
      <HeadError title="Page Not Found" />
      <LayoutError
        statusCode={404}
        description="The page could not be found"
      />
    </>
  );
};

export default Layout404;
