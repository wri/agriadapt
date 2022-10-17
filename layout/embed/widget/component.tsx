import CustomWidget from 'components/widgets/charts/v2/CustomWidget';
import PoweredBy from 'components/embed/powered-by';
import LayoutEmbed from 'layout/layout/layout-embed';
import { useTranslation } from 'next-i18next';
import React, { useMemo } from 'react';
import { capitalizeFirstLetter } from 'utils/utils';
import { isLoadedExternally } from 'utils/embed';

const isExternal = isLoadedExternally();

const LayoutEmbedWidgetContainer = ({ widget: w, country, crop, isWebshot, rcp }) => {
  const { t } = useTranslation(['common', 'countries', 'widgets']);

  const title = t(w.title, {
    country: t(`countries:${country.label}`, {
      keySeparator: ':',
    }),
  });

  const params = useMemo(
    () => ({
      crop: capitalizeFirstLetter(crop),
      country: country?.sql_label ?? country?.label,
      iso: country?.iso,
    }),
    [country, crop]
  );

  return (
    <LayoutEmbed title={title} description={w.description}>
      <div className="c-embed-widget widget-content">
        <CustomWidget
          title={title}
          info={w.info}
          widget={w.widget}
          controlsProps={{
            ...w.controlsProps,
            rcp,
            country: params.country,
          }}
        />
        {isExternal && !isWebshot && <PoweredBy />}
      </div>
    </LayoutEmbed>
  );
};

export default LayoutEmbedWidgetContainer;
