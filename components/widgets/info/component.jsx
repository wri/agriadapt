import { useMemo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useTranslation } from 'next-i18next';

export default function WidgetInfo({ widget, className }) {
  const widgetLinks = useMemo(
    () => widget?.metadata?.[0]?.info?.widgetLinks ?? widget?.links ?? [],
    [widget]
  );

  const { t } = useTranslation(['widgets']);

  return (
    <div
      className={classnames('c-widget-info', {
        [className]: Boolean(className),
      })}
    >
      <div className="widget-info-row">
        {!widget?.description && <p>{t('widgets:widget_info.none')}</p>}

        {widget?.description && (
          <>
            <h4>{t('widgets:widget_info.description')}</h4>
            <p>{t(widget.description)}</p>
          </>
        )}
      </div>

      {widgetLinks.length > 0 && (
        <div className="widget-info-row">
          <div className="widget-links-container">
            <h4>{t('widgets:widget_info.links')}</h4>
            <ul>
              {widgetLinks.map((link) => (
                <li key={t(link.name)}>
                  <a href={link.link} target="_blank" rel="noopener noreferrer">
                    {t(link.name)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

WidgetInfo.defaultProps = {
  style: {},
};

WidgetInfo.propTypes = {
  widget: PropTypes.shape({
    description: PropTypes.string,
    metadata: PropTypes.arrayOf(
      PropTypes.shape({
        info: PropTypes.shape({
          widgetLinks: PropTypes.arrayOf(
            PropTypes.shape({
              name: PropTypes.string,
              link: PropTypes.string,
            })
          ),
        }),
      })
    ),
  }).isRequired,
  style: PropTypes.shape({}),
};
