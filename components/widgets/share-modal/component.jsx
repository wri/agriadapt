import { useCallback, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { saveAs } from 'file-saver';
import dateFnsFormat from 'date-fns/format';

// components
import Modal from 'components/modal/modal-component';
import ShareModal from 'components/modal/share-modal';
import Spinner from 'components/ui/Spinner';

// services
import { takeWidgetWebshot } from 'services/webshot';

// utils
import { getLinksByWidgetType } from 'utils/embed';
import { getWidgetType } from 'utils/widget';
import { logEvent } from 'utils/analytics';
import { logger } from 'utils/logs';
import { india_maps_disclaimer } from '../types/map/constants';
import { useTranslation } from 'next-i18next';

export default function WidgetShareModal({
  isVisible,
  onClose,
  widget,
  params,
  worldview,
  country,
}) {
  const [isWebshotLoading, setWebshotLoading] = useState(false);
  const showDisclaimer = worldview === 'IN' && country.iso === 'IND';

  const handleWidgetWebshot = useCallback(async () => {
    try {
      const widgetType = getWidgetType(widget);

      logEvent('Share', 'user downloads an image of a widget', widget.name);

      setWebshotLoading(true);

      const { widgetThumbnail} = await takeWidgetWebshot(widget.id, {
        type: widgetType,
        ...params,
      });

      if (widgetThumbnail) {
        saveAs(
          widgetThumbnail,
          `${widget.slug ?? widget.id}-${dateFnsFormat(
            Date.now(),
            "yyyy-MM-dd'T'HH:mm:ss"
          )}.png`
        );
        setWebshotLoading(false);
      }
    } catch (e) {
      logger.error(`widget webshot: ${e.message}`);
      setWebshotLoading(false);
    }
  }, [widget, params]);

  const { t } = useTranslation(['widgets', 'modals']);

  const shareLinks = useMemo(
    () => getLinksByWidgetType(widget, params),
    [widget, params]
  );

  return (
    <Modal isOpen={isVisible} className="-medium" onRequestClose={onClose}>
      <ShareModal
        links={shareLinks}
        analytics={{
          facebook: () =>
            logEvent(
              'Share (embed)',
              `Share widget: ${widget?.name}`,
              'Facebook'
            ),
          twitter: () =>
            logEvent(
              'Share (embed)',
              `Share widget: ${widget?.name}`,
              'Twitter'
            ),
          email: () =>
            logEvent('Share', `Share widget: ${widget?.name}`, 'Email'),
          copy: (type) =>
            logEvent(
              'Share (embed)',
              `Share widget: ${widget?.name}`,
              `Copy ${type}`
            ),
        }}
      />
      {showDisclaimer && (
        <div className="flex">
          <span className="text-xs italic">{t(india_maps_disclaimer)}</span>
        </div>
      )}
      <div
        style={{
          display: 'flex',
          margin: showDisclaimer ? '20px 0 0' : '80px 0 0',
        }}
      >
        <button type="button" className="c-btn -primary" onClick={onClose}>
          {t('modals:share_modal.close')}
        </button>
        <button
          type="button"
          className={classnames('c-btn -secondary', {
            '-disabled': isWebshotLoading,
          })}
          onClick={handleWidgetWebshot}
          style={{
            margin: '0 0 0 10px',
            minWidth: 180,
          }}
        >
          {isWebshotLoading ? (
            <Spinner isLoading className="-transparent -small" />
          ) : t(
            'modals:share_modal.download_image'
          )}
        </button>
      </div>
    </Modal>
  );
}

WidgetShareModal.defaultProps = {
  isVisible: false,
  params: {},
};

WidgetShareModal.propTypes = {
  isVisible: PropTypes.bool,
  widget: PropTypes.shape({
    id: PropTypes.string,
    slug: PropTypes.string,
    name: PropTypes.string,
    widgetConfig: PropTypes.shape({
      type: PropTypes.string,
    }),
  }).isRequired,
  params: PropTypes.shape({}),
  onClose: PropTypes.func.isRequired,
};
