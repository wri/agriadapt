import LayoutHome from 'layout/app/home';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Home() {
  return <LayoutHome />;
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: { ...(await serverSideTranslations(locale, ['landing', 'common', 'header', 'footer'])) },
  };
};
