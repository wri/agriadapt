import LayoutCotton from 'layout/value-chains/cotton';
import { actions } from 'layout/value-chains/reducers';
import { wrapper } from 'lib/store';
import { GetServerSideProps } from 'next';
import { fetchGeostore } from 'services/geostore';
import { ValueChainPageProps } from 'types/value-chain';

const CottonPage = ({ countries }: ValueChainPageProps) => {
  return <LayoutCotton countries={countries} />;
};

const default_country = {
  label: 'India',
  value: '45d0f6f887a18df373fa69c3eb6f13c7',
  iso: 'IND',
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async ({query}) => {
    const { geostore } = query;
    const { dispatch } = store;
    const country = geostore && await fetchGeostore(
      Array.isArray(geostore) ? geostore.join('') : geostore
    ).then(({ id, info: { name, iso } }) => ({
      label: name,
      value: id,
      iso,
    })).catch(() => console.error('Error fetching geostore'));

    if (country) dispatch(actions.setCountry(country));
    else dispatch(actions.setCountry(default_country));

    dispatch(actions.setActiveCrop('cotton'));

    return {
      props: {
        countries: [
          {
            label: 'India',
            value: '45d0f6f887a18df373fa69c3eb6f13c7',
            iso: 'IND',
          },
          {
            label: 'United States',
            value: '0d9498ae40d288424ed5d570c999007e',
            iso: 'USA',
          },
          {
            label: 'Canada',
            value: 'c2402404ba6c37d2fde34e929700a896',
            iso: 'CAN',
          },
          {
            label: 'Colombia',
            value: '298fc2cf079fb1439a4ad816d258a965',
            iso: 'COL',
          },
        ],
      },
    };
  });

export default CottonPage;
