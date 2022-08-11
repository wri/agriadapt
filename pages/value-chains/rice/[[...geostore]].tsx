import LayoutRice from 'layout/value-chains/rice';
import { actions } from 'layout/value-chains/reducers';
import { RootState, wrapper } from 'lib/store';
import { ValueChainPageProps } from 'types/value-chain';
import { connect } from 'react-redux';
import { fetchCountries, fetchGeostore } from 'services/geostore';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import DROPDOWN from 'public/data/rice_countries.json';
import india_worldview_geostore from 'public/data/india_worldview_geostore.json';

const RicePage = ({ countries }: ValueChainPageProps) => {

  return <LayoutRice countries={countries} />;
};

const CROP = 'rice';

const default_country = {
  label: 'India',
  value: 'fb119d758d39527a91307b7fed3debf4',
  iso: 'IND',
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, locale, req }) => {
      const { geostore } = query;
      const { dispatch } = store;
      const viewer_iso2 = req.headers['cloudfront-viewer-country'];
      // const viewer_iso2 = 'IN';
      if (
        viewer_iso2 === 'IN' &&
        geostore === 'fb119d758d39527a91307b7fed3debf4'
      )
        return {
          redirect: {
            destination:
              '/value-chains/rice/1252b02f0a27cf77fd19b8298be6a8db',
            permanent: false,
          },
        };

      const country = geostore && await fetchGeostore(
        Array.isArray(geostore) ? geostore.join('') : geostore
      ).then(({ id, info: { name, iso } }) => ({
        label: name,
        value: id,
        iso,
      })).catch(() => console.error('Error fetching geostore'));

      if (country) dispatch(actions.setCountry(country));
      else
        dispatch(
          actions.setCountry(
            viewer_iso2 === 'IN' ? india_worldview_geostore : default_country
          )
        );

      dispatch(actions.setActiveCrop(CROP));

      const countries = (await fetchCountries()).reduce((arr, geo) => {
        if (!geo.name || !DROPDOWN.countries.includes(geo.name)) return arr;
        
        const { name: label, geostoreId: value, iso } = geo;
        if (iso === 'IND' && viewer_iso2 === 'IN')
          arr.push(india_worldview_geostore);
        else arr.push({ label, value, iso });
        return arr;
      }, []);

      return {
        props: {
          ...(await serverSideTranslations(locale, [
            CROP,
            'common',
            'countries',
            'header',
            'footer',
          ])),
          countries,
        },
      };
    }
);

export default connect(
  (state: RootState) => ({ country: state.value_chains.country }),
  actions
)(RicePage);
