import { useState, useEffect, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { replace } from '@vizzuality/layer-manager-utils';

// components
import LayoutEmbed from 'layout/layout/layout-embed';
import MapWidget from 'components/widgets/types/map';
import PoweredBy from 'components/embed/powered-by';

// hooks
import { useGeostore } from 'hooks/geostore';

// utils
import { isLoadedExternally } from 'utils/embed';

const WidgetShareModal = dynamic(
  () => import('../../../components/widgets/share-modal'),
  {
    ssr: false,
  }
);

const isExternal = isLoadedExternally();

interface LayoutEmbedMapProps {
  widget: {
    name?: string;
    description?: string;
    thumbnailUrl?: string;
  };
  widgetId: string;
  aoi?: string;
  params?: Record<string, any>;
  isWebshot?: boolean;
}

export default function LayoutEmbedMap({
  widget,
  widgetId,
  aoi = null,
  params = {},
  isWebshot = false,
}: LayoutEmbedMapProps) {
  const [widgetToShare, setWidgetToShare] = useState(null);

  const handleShareWidget = useCallback((_widget) => {
    setWidgetToShare(_widget);
  }, []);

  const handleCloseShareWidget = useCallback(() => {
    setWidgetToShare(null);
  }, []);

  useEffect(() => {
    if (!isWebshot) return null;

    // see https://resource-watch.github.io/doc-api/reference.html#webshot
    // it waits until 2 seconds to notify is ready to screenshot
    const timerId = window.setTimeout(() => {
      window['WEBSHOT_READY'] = true;
    }, 2000);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [isWebshot]);

  const { data: geostoreProperties } = useGeostore(
    params?.geostore_id || aoi,
    {},
    {
      enabled: Boolean(params?.geostore_id || aoi),
      select: (geostore) => {
        if (!geostore) return {};
        return geostore.geojson.features[0].properties || {};
      },
      placeholderData: null,
    }
  );

  const updatedParams = useMemo(
    () => ({ ...params, ...geostoreProperties }),
    [params, geostoreProperties]
  );

  return (
    <LayoutEmbed
      title={replace(widget.name, updatedParams)}
      description={`${widget?.description || ''}`}
      {...(widget?.thumbnailUrl && { thumbnailUrl: widget.thumbnailUrl })}
    >
      <div className="c-embed-widget widget-content">
        <MapWidget
          widgetId={widgetId}
          isEmbed
          onToggleShare={handleShareWidget}
          {...(aoi && { areaOfInterest: aoi })}
          {...(isWebshot && { isWebshot: true })}
          params={updatedParams}
        />

        {isExternal && !isWebshot && <PoweredBy />}
      </div>
      {!!widgetToShare && (
        <WidgetShareModal
          isVisible
          widget={widgetToShare}
          onClose={handleCloseShareWidget}
          params={{
            ...(aoi && { aoi }),
            ...params,
          }}
        />
      )}
    </LayoutEmbed>
  );
}
