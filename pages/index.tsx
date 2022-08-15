import { withSession } from 'hoc/session';
import LayoutHome from 'layout/app/home';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Home() {
  return <LayoutHome />;
}

export const getServerSideProps: GetServerSideProps = withSession(
  async ({ locale }) => {
    return {
      props: {
        ...(await serverSideTranslations(locale, [
          'landing',
          'common',
          'header',
          'footer',
        ])),
      },
    };
  }
);
