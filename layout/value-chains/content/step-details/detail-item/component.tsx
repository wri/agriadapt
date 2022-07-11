import classnames from 'classnames';
import Icon from 'components/ui/icon';
import WidgetBlock from 'components/wysiwyg/widget-block/component';
import { useFetchWidget } from 'hooks/widget';

interface DetailItemProps {
  label: {
    icon: string;
    label: string;
  };
  info: string | ((string: string) => string);
  widgetId?: string;
  country: { label: string; value: string };
}

const DetailItem = ({ label: { icon, label }, info, widgetId = '', country }: DetailItemProps) => {

  const { data: widget } = useFetchWidget(widgetId);

  return (
    <>
      <div className="c-detail-item">
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
        <div
          className={classnames({
            'c-widget': true,
            '-side': true,
            '-placeholder': !widgetId,
          })}
        >
          {widget && (
            <WidgetBlock
              {...(country && { areaOfInterest: country.value })}
              widget={widget}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default DetailItem;
