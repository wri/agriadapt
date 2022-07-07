import LayoutCoffee from 'layout/value-chains/coffee';
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import { ValueChainPageProps } from 'types/value-chain';

const CoffeeCountryPage = (props: ValueChainPageProps) => {
  return <LayoutCoffee {...props} />;
};

const coffeeLayers = [
  'foo_005_rw1_crop_area_production_spam2010V2r0_global_H_ACOF_A',
  'foo_005_rw1_crop_area_production_spam2010V2r0_global_H_RCOF_A',
  'foo_005_rw1_crop_area_production_spam2010V2r0_global_P_ACOF_A',
  'foo_005_rw1_crop_area_production_spam2010V2r0_global_P_RCOF_A',
  'foo_005_rw1_crop_area_production_spam2010V2r0_global_Y_ACOF_A',
  'foo_005_rw1_crop_area_production_spam2010V2r0_global_Y_RCOF_A'
]

export const getServerSideProps: GetServerSideProps = async (context) => {
  
  return { props: {} };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const cid = params?.cid;

  return {
    props: {
      cid: cid,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { cid: 'colombia' } }],
    fallback: false,
  };
};

export default CoffeeCountryPage;
