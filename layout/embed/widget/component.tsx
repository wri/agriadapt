import { useState, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';

// components
import LayoutEmbed from 'layout/layout/layout-embed';
import ChartWidget from 'components/widgets/types/chart';
import PoweredBy from 'components/embed/powered-by';

import { isLoadedExternally } from 'utils/embed';
import { APIWidgetSpec } from 'types/widget';

export interface LayoutEmbedWidgetProps {
  widgetId: string;
  widget: APIWidgetSpec;
  params: Record<string, string | number>;
  isWebshot: boolean;
}

const WidgetShareModal = dynamic(() => import('../../../components/widgets/share-modal'), {
  ssr: false,
});

const isExternal = isLoadedExternally();

const LayoutEmbedWidget = ({
  widgetId,
  widget,
  params,
  isWebshot,
}: LayoutEmbedWidgetProps): JSX.Element => {
  const [widgetToShare, setWidgetToShare] = useState<APIWidgetSpec>(null);

  const handleShareWidget = useCallback((_widget: APIWidgetSpec) => {
    setWidgetToShare(_widget);
  }, []);

  const handleCloseShareWidget = useCallback(() => {
    setWidgetToShare(null);
  }, []);

  useEffect(() => {
    // see https://resource-watch.github.io/doc-api/reference.html#isWebshot
    // it waits until 2 seconds to notify is ready to screenshot
    const timerId = window.setTimeout(() => {
      window.WEBSHOT_READY = true;
    }, 2000);

    return () => {
      window.clearTimeout(timerId);
    };
  }, []);

  return (
    <LayoutEmbed
      title={widget.name}
      description={`${widget.description || ''}`}
      {...(widget.thumbnailUrl && { thumbnailUrl: widget.thumbnailUrl })}
    >
      <div className="c-embed-widget widget-content">
        <ChartWidget
          widgetId={widgetId}
          params={params}
          encodeParams={false}
          onToggleShare={handleShareWidget}
          isEmbed
          {...(isWebshot && { isWebshot: true })}
          style={{
            ...(isExternal && !isWebshot && { height: 'calc(100% - 56px)' }),
          }}
        />
        {isExternal && !isWebshot && <PoweredBy />}
      </div>
      {widgetToShare && (
        <WidgetShareModal
          isVisible
          widget={widgetToShare}
          onClose={handleCloseShareWidget}
          params={{}}
        />
      )}
    </LayoutEmbed>
  );
};

export default LayoutEmbedWidget;
