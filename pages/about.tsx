import { withSession } from 'hoc/session';
import LayoutAbout from 'layout/about';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const AboutPage = () => {
  return <LayoutAbout />;
};

export const getServerSideProps: GetServerSideProps = withSession(
  async ({ locale }) => {
    return {
      props: {
        ...(await serverSideTranslations(locale, [
          'about',
          'common',
          'header',
          'footer',
          'tos',
          'privacy',
        ])),
      },
    };
  }
);

export default AboutPage;
