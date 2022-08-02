// hooks
import { useFetchWidget } from 'hooks/widget';
import { ParsedUrlQuery } from 'querystring';

// components
import LayoutEmbedMap from './component';

interface LayoutEmbedMapContainerProps {
  widgetId: string;
  params: ParsedUrlQuery,
}

export default function LayoutEmbedMapContainer({
  widgetId,
  ...props
}: LayoutEmbedMapContainerProps) {
  const { data: widget } = useFetchWidget(
    widgetId,
    {
      includes: 'metadata',
    },
    {
      enabled: !!widgetId,
      refetchOnWindowFocus: false,
      placeholderData: {},
    }
  );

  return <LayoutEmbedMap widget={widget} widgetId={widgetId} {...props} />;
}
