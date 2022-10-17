import { connect } from 'react-redux';
import { RootState, wrapper } from 'lib/store';

// actions
import * as actions from 'layout/explore/actions';
import { setEmbed } from 'redactions/common';

// hoc
import { withSession } from 'hoc/session';

// components
import Explore from 'layout/embed/explore';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const EmbedExplorePage = () => <Explore />;

export const getServerSideProps = withSession(
  wrapper.getServerSideProps((store) => async ({ query, locale }) => {
    const { dispatch } = store;
    const {
      zoom,
      lat,
      lng,
      pitch,
      bearing,
      basemap,
      labels,
      boundaries,
      layers,
    } = query;

    // Embed
    dispatch(setEmbed(true));

    // sets map params from URL
    dispatch(
      actions.setViewport({
        ...(zoom && { zoom: +zoom }),
        ...(lat &&
          lng && {
            latitude: +lat,
            longitude: +lng,
          }),
        ...(pitch && { pitch: +pitch }),
        ...(bearing && { bearing: +bearing }),
      })
    );
    if (basemap) dispatch(actions.setBasemap(String(basemap)));
    if (labels) dispatch(actions.setLabels(String(labels)));
    if (boundaries) dispatch(actions.setBoundaries(!!boundaries));

    // Fetch layers
    if (layers)
      await dispatch(
        actions.fetchMapLayerGroups(
          JSON.parse(decodeURIComponent(String(layers)))
        )
      );

    return {
      props: {
        ...(await serverSideTranslations(locale, [
          'explore',
          'common',
          'countries',
          'header',
          'modals',
        ])),
      },
    };
  })
);

export default connect(
  (state: RootState) => ({
    explore: state.explore,
  }),
  actions
)(EmbedExplorePage);
