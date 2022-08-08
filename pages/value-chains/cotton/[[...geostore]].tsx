import LayoutCotton from 'layout/value-chains/cotton';
import { actions } from 'layout/value-chains/reducers';
import { wrapper } from 'lib/store';
import { GetServerSideProps } from 'next';
import { fetchCountries, fetchGeostore } from 'services/geostore';
import { ValueChainPageProps } from 'types/value-chain';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import DROPDOWN from 'public/data/cotton_countries.json';
import india_worldview_geostore from 'public/data/india_worldview_geostore.json';

const CottonPage = ({ countries }: ValueChainPageProps) => {
  return <LayoutCotton countries={countries} />;
};

const CROP = 'cotton';

const default_country = {
  label: 'India',
  value: '45d0f6f887a18df373fa69c3eb6f13c7',
  iso: 'IND',
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, locale, req }) => {
      const { geostore } = query;
      const { dispatch } = store;
      const viewer_iso2 = req.headers['cloudfront-viewer-country'];
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
            viewer_iso2 === 'IN' ? india_worldview_geostore : default_country
          )
        );

      dispatch(actions.setActiveCrop(CROP));

      const countries = (await fetchCountries()).reduce((arr, geo) => {
        if (!geo.name || !DROPDOWN.countries.includes(geo.name)) return arr;
        
        const { name: label, geostoreId: value, iso } = geo;
        if (iso === 'IND' && viewer_iso2 === 'IN')
          arr.push({ india_worldview_geostore });
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

export default CottonPage;
