import { withSession } from 'hoc/session';
import LayoutAdapt from 'layout/adaptation/component';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import adaptationData from '../public/locales/en/adaptation.json'; // Import local JSON file

const AdaptationPage = ({ data }) => {
  return <LayoutAdapt data={data} error={undefined} />;
};

export const getServerSideProps: GetServerSideProps = withSession(
  async ({ locale }) => {
    try {
      return {
        props: {
          data: adaptationData.data, 
          ...(await serverSideTranslations(locale, [
            'adaptation',
            'common',
            'header',
            'footer',
            'tos',
            'privacy',
          ])),
        },
      };
    } catch (error) {
      console.error('Error loading data:', error);
      return {
        props: {
          data: null,
          ...(await serverSideTranslations(locale, [
            'adaptation',
            'common',
            'header',
            'footer',
            'tos',
            'privacy',
          ])),
        },
      };
    }
  }
);

export default AdaptationPage;
