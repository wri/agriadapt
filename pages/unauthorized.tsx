import React from 'react';

import LayoutError from 'layout/error';
import HeadError from 'layout/head/error';
import { GetServerSideProps } from 'next';
import { withSession } from 'hoc/session';

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

export const getServerSideProps: GetServerSideProps = withSession();

export default LayoutUnauthorized;
