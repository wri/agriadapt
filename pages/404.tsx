import React from 'react';

import LayoutError from 'layout/error';
import HeadError from 'layout/head/error';
import { GetServerSideProps } from 'next';
import { withSession } from 'hoc/session';

const Layout404 = () => {
  return (
    <>
      <HeadError title="Page Not Found" />
      <LayoutError statusCode={404} description="The page could not be found" />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = withSession();

export default Layout404;
