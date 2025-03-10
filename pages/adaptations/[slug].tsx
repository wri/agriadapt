import { withSession } from 'hoc/session';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import axios from 'axios';
import Cropdetails from '../../layout/adaptation/exploreAdapt';
import croprice from '../../public/locales/en/croprice.json';
import cropcotton from '../../public/locales/en/cropcotton.json';
// import inputs_and_production_1 from '../../public/locales/en/inputs_and_production_1.json';
// import storage_and_processing from '../../public/locales/en/storage_and_processing.json';
// import inputs_and_production from '../../public/locales/en/inputs_and_production.json';
// import storage_and_processing_1 from '../../public/locales/en/storage_and_processing_1.json';
// import transport_trade_and_sales from '../../public/locales/en/transport_trade_and_sales.json';
// import transport_trade_and_sales_1 from '../../public/locales/en/transport_trade_and_sales_1.json';

const CropDetailPage = ({ data}) => {
  return (
    <div>
      <Cropdetails
        data={data}
      />
    </div>
  );
};



export const getServerSideProps: GetServerSideProps = withSession(
  async ({ locale, params }) => {
    const slug = params?.slug as string;

    try {

      const data = slug === 'rice' ? croprice.data : slug === 'cotton' ? cropcotton.data : [];

      return {
        props: {
          data,
          ...(await serverSideTranslations(locale || 'en', [
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
      console.error('Error fetching data:', error);
      return {
        props: {
          data: [],
          adaptationData: {},
          adaptationDataStorage: {},
          adaptationDataTransport: {},
          ...(await serverSideTranslations(locale || 'en', [
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


export default CropDetailPage;
