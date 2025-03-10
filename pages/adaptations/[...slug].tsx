import { withSession } from 'hoc/session';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import CropDetailComponent from '../../layout/adaptation/exploreAdapt/details';
import { useTranslation } from 'next-i18next';

const CropDetailPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <CropDetailComponent />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = withSession(
  async ({ locale }) => {

    return {
      props: {
        ...(await serverSideTranslations(locale ?? 'en', [
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
);

export default CropDetailPage;
