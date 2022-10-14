import { useRouter } from 'next/router';

// components
import LayoutEmbedWidget from 'layout/embed/widget';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { fetchGeostore } from 'services/geostore';
import { actions } from 'layout/value-chains/reducers';
import { wrapper } from 'lib/store';
import { withSession } from 'hoc/session';
import { coffee_landslide_widget } from 'layout/value-chains/coffee/constants';
import { cotton_landslide_widget } from 'layout/value-chains/cotton/constants';
import { rice_landslide_widget } from 'layout/value-chains/rice/constants';
import { coffee_import_widget } from 'layout/value-chains/coffee/constants';
import { cotton_import_widget } from 'layout/value-chains/cotton/constants';
import { rice_import_widget } from 'layout/value-chains/rice/constants';

const widgets = {
  coffee_ls: coffee_landslide_widget,
  cotton_ls: cotton_landslide_widget,
  rice_ls: rice_landslide_widget,
  coffee_ie: coffee_import_widget,
  cotton_ie: cotton_import_widget,
  rice_ie: rice_import_widget,
}

const geostore_defaults = {
  coffee_ls: '298fc2cf079fb1439a4ad816d258a965',
  cotton_ls: 'fb119d758d39527a91307b7fed3debf4',
  rice_ls: 'fb119d758d39527a91307b7fed3debf4',
  coffee_ie: '298fc2cf079fb1439a4ad816d258a965',
  cotton_ie: 'fb119d758d39527a91307b7fed3debf4',
  rice_ie: 'fb119d758d39527a91307b7fed3debf4',
}

const EmbedWidgetPage = ({ id }) => {
  const {
    query: { webshot, rcp },
  } = useRouter();

  return (
    <LayoutEmbedWidget
      {...(webshot && { isWebshot: true })}
      widget={widgets[id]}
      rcp={rcp}
      // params={restQueryParams}
    />
  );
};

export const getServerSideProps: GetServerSideProps = withSession(
  wrapper.getServerSideProps(
    (store) =>
      async ({ query, locale, params }) => {
        const { id } = params;
        const { geostore = geostore_defaults[String(id)]} = query;
        const { dispatch } = store;

        const country =
          geostore &&
          (await fetchGeostore(String(geostore))
            .then(({ id, info: { name, iso } }) => ({
              label: name,
              value: id,
              iso,
            }))
            .catch((e) => console.error('Error fetching geostore', e)));

        if (country) dispatch(actions.setCountry(country));

        return {
          props: {
            id: String(id),
            ...(await serverSideTranslations(locale, [
              'common',
              'widgets',
              'countries',
              'modals',
            ])),
          },
        };
      }
  )
);

export default EmbedWidgetPage;
