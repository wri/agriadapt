import LayoutHome from 'layout/app/home';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Home({ req }) {
  console.log(req);
  return <LayoutHome />;
}

export const getServerSideProps: GetServerSideProps = async ({ req, locale }) => {
  return {
    props: { req, ...(await serverSideTranslations(locale, ['landing', 'common', 'header', 'footer'])) },
  };
};
