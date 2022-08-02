import { useRouter } from 'next/router';

// components
import LayoutEmbedMap from 'layout/embed/map';

const EmbedMapPage = () => {
  const {
    query: { id, webshot, aoi, ...restQueryParams },
  } = useRouter();

  return (
    <LayoutEmbedMap
      widgetId={Array.isArray(id) ? id.join('') : id}
      {...(webshot && { isWebshot: true })}
      {...(aoi && { aoi })}
      params={restQueryParams}
    />
  );
};

export default EmbedMapPage;
