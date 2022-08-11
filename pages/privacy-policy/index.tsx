import LayoutHome from 'layout/app/home';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function PrivacyPolicyPage() {
  return <LayoutHome showPrivacyModal />;
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'landing',
        'footer',
        'header',
        'privacy',
      ])),
    },
  };
};
