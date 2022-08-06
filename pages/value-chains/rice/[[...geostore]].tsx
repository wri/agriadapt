import LayoutRice from 'layout/value-chains/rice';
import { actions } from 'layout/value-chains/reducers';
import { RootState, wrapper } from 'lib/store';
import { ValueChainPageProps } from 'types/value-chain';
import { connect } from 'react-redux';
import { fetchGeostore } from 'services/geostore';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const RicePage = ({ countries }: ValueChainPageProps) => {

  return <LayoutRice countries={countries} />;
};

const CROP = 'rice';

const default_country = {
  label: 'India',
  value: '45d0f6f887a18df373fa69c3eb6f13c7',
  iso: 'IND',
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, locale, req }) => {
      const { geostore } = query;
      const { dispatch } = store;
      const viewer_iso2 = req.headers['cloudfront-viewer-country'];
      const country = geostore && await fetchGeostore(
        Array.isArray(geostore) ? geostore.join('') : geostore
      ).then(({ id, info: { name, iso } }) => ({
        label: name,
        value: id,
        iso,
      })).catch(() => console.error('Error fetching geostore'));

      if (country) dispatch(actions.setCountry(country));
      else dispatch(actions.setCountry(default_country));

      dispatch(actions.setActiveCrop(CROP));

      return {
        props: {
          ...(await serverSideTranslations(locale, [
            CROP,
            'common',
            'header',
            'footer',
          ])),
          countries: [
            {
              label: 'India',
              value:
                viewer_iso2 === 'IN'
                  ? '1252b02f0a27cf77fd19b8298be6a8db'
                  : '45d0f6f887a18df373fa69c3eb6f13c7',
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
    }
);

export default connect(
  (state: RootState) => ({ country: state.value_chains.country }),
  actions
)(RicePage);
