import classnames from 'classnames';
import Icon from 'components/ui/icon';
import WidgetBlock from 'components/wysiwyg/widget-block/component';
import { useFetchWidget } from 'hooks/widget';

const DetailItem = ({ label: { icon, label }, info, widgetId }) => {

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
            <p className="description">{info}</p>
          </div>
        </div>
        <div
          className={classnames({
            'c-widget': true,
            '-side': true,
            '-placeholder': !widgetId
          })}
        >
          {widget && <WidgetBlock widget={widget} />}
        </div>
      </div>
    </>
  );
};

export default DetailItem;
