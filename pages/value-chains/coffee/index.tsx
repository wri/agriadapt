import LayoutCoffee from 'layout/value-chains/coffee';
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import { ValueChainPageProps } from 'types/value-chain';

const CoffeeCountryPage = (props: ValueChainPageProps) => {
  return <LayoutCoffee {...props} />;
};

// const coffeeLayers = [
//   'foo_005_rw1_crop_area_production_spam2010V2r0_global_H_ACOF_A',
//   'foo_005_rw1_crop_area_production_spam2010V2r0_global_H_RCOF_A',
//   'foo_005_rw1_crop_area_production_spam2010V2r0_global_P_ACOF_A',
//   'foo_005_rw1_crop_area_production_spam2010V2r0_global_P_RCOF_A',
//   'foo_005_rw1_crop_area_production_spam2010V2r0_global_Y_ACOF_A',
//   'foo_005_rw1_crop_area_production_spam2010V2r0_global_Y_RCOF_A',
// ];

// export const getServerSideProps: GetServerSideProps = async (context) => {

//   return { props: {} };
// };

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      countries: [
        {
          label: 'India',
          value: '45d0f6f887a18df373fa69c3eb6f13c7',
        },
        {
          label: 'United States',
          value: '0d9498ae40d288424ed5d570c999007e',
        },
        {
          label: 'Canada',
          value: 'c2402404ba6c37d2fde34e929700a896',
        },
        {
          label: 'Colombia',
          value: '298fc2cf079fb1439a4ad816d258a965',
        },
      ],
    },
  };
};

export default CoffeeCountryPage;
