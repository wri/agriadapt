import classnames from 'classnames';
import Icon from 'components/ui/icon';
import CustomWidget from 'components/widgets/charts/v2/CustomWidget';
import CalloutCard from 'components/widgets/charts/v2/CalloutCard';
import WidgetBlock from 'components/wysiwyg/widget-block';
import { Trans, useTranslation } from 'next-i18next';
import { useEffect, useMemo, useState } from 'react';
import { fetchGeostore } from 'services/geostore';
import { capitalizeFirstLetter } from 'utils/utils';

interface DetailItemProps {
  key: string;
  label: {
    icon: string;
    label: string;
  };
  id: string;
  info: string;
  widgets?: {
    id?: string | ((country: string) => string);
    title: string;
    fullWidth?: boolean;
    type?: string | 'custom';
    widget?: React.FunctionComponent;
    controlsProps?: any;
  }[];
  country: { label: string; sql_label?: string; value: string; iso: string };
  analysis?: {
    query: (params: Record<string, string | number>) => string;
    dataset: string;
    type?: string;
    name: string;
    format?: string;
    suffix?: string;
  };
  crop: 'rice' | 'cotton' | 'coffee';
  fullWidth?: boolean;
}

const DetailItem = ({
  label: { icon, label },
  key,
  id,
  info,
  widgets = [],
  country = null,
  analysis = null,
  crop = 'rice',
  fullWidth = false,
}: DetailItemProps) => {
  const [geojson, setGeoJson] = useState('');

  const { t } = useTranslation([crop, 'common', 'widgets', 'countries']);

  useEffect(() => {
    if (country?.value)
      fetchGeostore(country.value).then(({ geojson }) => {
        // setGeoJson(encodeURIComponent(JSON.stringify(geojson)))
        setGeoJson(JSON.stringify(geojson));
      });
  }, [country?.value]);

  const params = useMemo(
    () => ({
      crop: capitalizeFirstLetter(crop),
      country: country?.sql_label ?? country?.label,
      iso: country?.iso,
      geojson,
    }),
    [country, crop, geojson]
  );
  return (
    <>
      <div key={key} id={id} className="c-detail-item">
        <div
          className={classnames('c-detail-section', {
            '-full': fullWidth,
          })}
        >
          <div className="c-detail-item-info">
            <div className="c-step-icon">
              <Icon
                name={icon}
                className={classnames({
                  'c-icon': true,
                })}
              />
            </div>
            <div>
              <h3>{t(label)}</h3>
              <p className="description">
                <Trans i18nKey={info}>
                  {t(info)} {{ country: country?.label }}
                </Trans>
              </p>
            </div>
          </div>
        </div>
        {widgets.map((w, i) => (
          <div
            key={i}
            className={classnames('c-detail-section', {
              '-full': w.fullWidth,
            })}
          >
            <div
              className={classnames({
                'c-widget': true,
                '-placeholder': !w,
              })}
            >
              {!w.type && (
                <WidgetBlock
                  widgetId={
                    typeof w.id === 'function' ? w.id(params.country) : w.id
                  }
                  {...(country && { areaOfInterest: country.value })}
                />
              )}
              {w.type === 'custom' && (
                <CustomWidget
                  title={t(w.title, {
                    country: t(`countries:${country.label}`, {
                      keySeparator: ':',
                    }),
                  })}
                  widget={w.widget}
                  controlsProps={{
                    ...w.controlsProps,
                    country: params.country,
                  }}
                />
              )}
            </div>
          </div>
        ))}
        {analysis && <CalloutCard analysis={analysis} params={params} />}
      </div>
    </>
  );
};

export default DetailItem;
