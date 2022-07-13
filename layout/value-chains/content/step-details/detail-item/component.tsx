import classnames from 'classnames';
import Icon from 'components/ui/icon';
import TextChart from 'components/widgets/charts/v2/TextChart';
import WidgetBlock from 'components/wysiwyg/widget-block';

interface DetailItemProps {
  label: {
    icon: string;
    label: string;
  };
  info: string | ((string: string) => string);
  widgets?: { id: string; fullWidth?: boolean }[];
  country: { label: string; value: string };
  analysis?: {
    query: string;
    type: string;
    name: string | ((string: string) => string);
  };
}

const DetailItem = ({
  label: { icon, label },
  info,
  widgets = [],
  country,
  analysis = null,
}: DetailItemProps) => {
  return (
    <>
      <div className="c-detail-item">
        <div
          className={classnames('c-detail-section', {
            '-half': true,
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
              // '-left': !w.fullWidth && ,
              '-right': !w.fullWidth && i === 0,
            })}
          >
            <div
              className={classnames({
                'c-widget': true,
                '-placeholder': !w,
              })}
            >
              <WidgetBlock
                widgetId={w.id}
                {...(country && { areaOfInterest: country.value })}
              />
            </div>
          </div>
        ))}
        {analysis && (
          <div className="c-widget">
            <TextChart value={20.2} name={analysis.name} type={analysis.type} />
          </div>
        )}
      </div>
    </>
  );
};

export default DetailItem;
