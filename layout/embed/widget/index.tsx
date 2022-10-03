import CustomWidget from 'components/widgets/charts/v2/CustomWidget';
import LayoutEmbed from 'layout/layout/layout-embed';
// import { useTranslation } from 'next-i18next';
import React from 'react';

const LayoutEmbedWidgetContainer = (props) => {

  // const { t } = useTranslation();

  return (
    <LayoutEmbed title="Test" description="A test i'm doing">
      <div className="c-embed-widget widget-content">
        {/* <CustomWidget
          title={t(w.title, {
            country: t(`countries:${country.label}`, {
              keySeparator: ':',
            }),
          })}
          info={w.info}
          widget={w.widget}
          controlsProps={{
            ...w.controlsProps,
            country: params.country,
          }}
        /> */}
      </div>
    </LayoutEmbed>
  );
};

export default LayoutEmbedWidgetContainer;
