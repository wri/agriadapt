import LayoutCotton from 'layout/value-chains/cotton';
import { actions } from 'layout/value-chains/reducers';
import { RootState, wrapper } from 'lib/store';
import { GetServerSideProps } from 'next';
import { fetchCountries, fetchGeostore } from 'services/geostore';
import { ValueChainPageProps } from 'types/value-chain';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import DROPDOWN from 'public/data/cotton_countries.json';
import india_worldview_geostore from 'public/data/india_worldview_geostore.json';
import { withSession } from 'hoc/session';
import { connect } from 'react-redux';

const CottonPage = ({ countries, iso }: ValueChainPageProps) => {
  return <LayoutCotton iso={iso} countries={countries} />;
};

const CROP = 'cotton';

const default_country = {
  label: 'India',
  value: 'fb119d758d39527a91307b7fed3debf4',
  iso: 'IND',
};

export const getServerSideProps: GetServerSideProps = withSession(
  wrapper.getServerSideProps((store) => async ({ query, locale, req }) => {
    const { geostore } = query;
    const { dispatch } = store;
    const worldview = req.session.user?.country;
    const india_worldview = worldview === 'IN';

    if (india_worldview && geostore === 'fb119d758d39527a91307b7fed3debf4')
      return {
        redirect: {
          destination: '/value-chains/cotton/1252b02f0a27cf77fd19b8298be6a8db',
          permanent: false,
        },
      };

    const country =
      geostore &&
      (await fetchGeostore(
        Array.isArray(geostore) ? geostore.join('') : geostore
      )
        .then(({ id, info: { name, iso } }) => ({
          label: name,
          value: id,
          iso,
        }))
        .catch(() => console.error('Error fetching geostore')));

    if (country) dispatch(actions.setCountry(country));
    else
      dispatch(
        actions.setCountry(
          india_worldview ? india_worldview_geostore : default_country
        )
      );

    dispatch(actions.setActiveCrop(CROP));

    const countries = (await fetchCountries()).reduce((arr, geo) => {
      if (!geo.name || !DROPDOWN.countries.includes(geo.name)) return arr;

      const { name: label, geostoreId: value, iso } = geo;
      if (iso === 'IND' && india_worldview) arr.push(india_worldview_geostore);
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
          'widgets',
        ])),
        countries,
      },
    };
  })
);

export default connect((state: RootState) => ({
  iso: state.value_chains.country.iso,
}))(CottonPage);
