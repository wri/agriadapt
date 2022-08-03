import LayoutAbout from 'layout/about';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const AboutPage = () => {
  return <LayoutAbout />;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: { ...(await serverSideTranslations(locale, ['about', 'common', 'header', 'footer'])) },
  };
};

export default AboutPage;
