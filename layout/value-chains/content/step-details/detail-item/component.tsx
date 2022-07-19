import classnames from 'classnames';
import Icon from 'components/ui/icon';
import TextChart from 'components/widgets/charts/v2/TextChart';
import WidgetBlock from 'components/wysiwyg/widget-block';
import { useEffect, useMemo, useState } from 'react';
import { fetchGeostore } from 'services/geostore';
import { capitalizeFirstLetter } from 'utils/utils';

interface DetailItemProps {
  label: {
    icon: string;
    label: string;
  };
  info: string | ((string: string) => string);
  widgets?: {
    id: string | ((country: string) => string);
    fullWidth?: boolean;
  }[];
  country: { label: string; value: string; iso: string };
  analysis?: {
    query: (params: Record<string, string | number>) => string;
    dataset: string;
    type?: string;
    name: string | ((params: Record<string, string | number>) => string);
    format?: string;
    suffix?: string;
  };
  crop: 'rice' | 'cotton' | 'coffee';
  fullWidth: boolean;
}

const DetailItem = ({
  label: { icon, label },
  info,
  widgets = [],
  country = null,
  analysis = null,
  crop = 'rice',
  fullWidth = false,
}: DetailItemProps) => {
  const [geojson, setGeoJson] = useState('');

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
      country: country?.label,
      iso: country?.iso,
      geojson,
    }),
    [country, crop, geojson]
  );
  return (
    <>
      <div className="c-detail-item">
        <div
          className={classnames('c-detail-section', {
            '-full': fullWidth,
          })}
        >
          <div className="c-detail-item-info">
            <div
              className={classnames({
                'c-step-icon': true,
                'c-button': true,
              })}
            >
              <Icon
                name={icon}
                className={classnames({
                  'c-icon': true,
                })}
              />
            </div>
            <div>
              <h3>{label}</h3>
              <p className="description">
                {typeof info === 'function' ? info(country?.label) : info}
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
              <WidgetBlock
                widgetId={
                  typeof w.id === 'function' ? w.id(country.label) : w.id
                }
                {...(country && { areaOfInterest: country.value })}
              />
            </div>
          </div>
        ))}
        {analysis && (
          <div className="c-widget">
            <TextChart analysis={analysis} params={params} />
          </div>
        )}
      </div>
    </>
  );
};

export default DetailItem;
