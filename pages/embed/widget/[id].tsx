import { useRouter } from 'next/router';

// components
import LayoutEmbedWidget from 'layout/embed/widget';

const EmbedWidgetPage = () => {
  const {
    query: { id, webshot, aoi, ...restQueryParams },
  } = useRouter();

  return (
    <LayoutEmbedWidget
      widgetId={String(id)}
      {...(webshot && { isWebshot: true })}
      params={restQueryParams}
    />
  );
};

export default EmbedWidgetPage;
