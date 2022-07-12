import classnames from 'classnames';
import Icon from 'components/ui/icon';
import WidgetBlock from 'components/wysiwyg/widget-block';

interface DetailItemProps {
  label: {
    icon: string;
    label: string;
  };
  info: string | ((string: string) => string);
  widgetIds?: string[];
  country: { label: string; value: string };
}

const DetailItem = ({
  label: { icon, label },
  info,
  widgetIds = [],
  country,
}: DetailItemProps) => {
  return (
    <>
      <div
        className={classnames('c-detail-item', {
          '-side': widgetIds.length <= 1,
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
        {widgetIds.map((w, i) => (
          <div
            key={i}
            className={classnames({
              'c-widget': true,
              '-side': widgetIds.length <= 1,
              '-placeholder': !w,
            })}
          >
            <WidgetBlock
              widgetId={w}
              {...(country && { areaOfInterest: country.value })}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default DetailItem;
