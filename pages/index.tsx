import LayoutHome from 'layout/app/home';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Home({ iso2 }) {
  console.log('viewer country', iso2);
  return <LayoutHome />;
}

export const getServerSideProps: GetServerSideProps = async ({ req, locale }) => {
  // Get viewer country ISO2 code from Amazon Cloudfront Header
  const iso2 = req.headers['cloudfront-viewer-country'];
  // India = 'IN'
  return {
    props: { iso2, ...(await serverSideTranslations(locale, ['landing', 'common', 'header', 'footer'])) },
  };
};
