import { useRouter } from 'next/router';

// components
import LayoutEmbedMap from 'layout/embed/map';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const EmbedMapPage = () => {
  const {
    query: { id, webshot, aoi, ...restQueryParams },
  } = useRouter();

  return (
    <LayoutEmbedMap
      widgetId={String(id)}
      {...(webshot && { isWebshot: true })}
      {...(aoi && { aoi })}
      params={restQueryParams}
    />
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'countries',
        'modals'
      ])),
    }
  }
}

export default EmbedMapPage;
