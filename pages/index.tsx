import { withSession } from 'hoc/session';
import LayoutHome from 'layout/app/home';
import { setWorldview } from 'layout/explore/actions';
import { wrapper } from 'lib/store';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Home() {
  return <LayoutHome />;
}

export const getServerSideProps: GetServerSideProps = withSession(
  wrapper.getServerSideProps((store) => async ({ locale, req }) => {
    const { dispatch } = store;
    const worldview =
      req.headers['cloudfront-viewer-country'] ??
      req.session.user?.country ??
      'US';
    // const worldview = 'IN';
    req.session.user = {
      country: Array.isArray(worldview) ? worldview.join('') : worldview,
    };
    await req.session.save();
    dispatch(setWorldview(String(worldview)));
    return {
      props: {
        ...(await serverSideTranslations(locale, [
          'landing',
          'common',
          'header',
          'footer',
        ])),
      },
    };
  })
);
