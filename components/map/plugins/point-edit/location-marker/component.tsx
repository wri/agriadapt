import React, { useCallback, useEffect, useState } from 'react';
import { Marker } from 'react-map-gl';
import Pin from './pin';

const LocationMarker = ({
  location: { latitude, longitude, editing },
  setDataDrawing,
  onDropMarker = undefined,
}) => {
  const [marker, setMarker] = useState({ latitude, longitude });

  /* Update marker based on changed lat, long props */
  useEffect(() => {
    setMarker({ latitude, longitude });
  }, [latitude, longitude]);

  const onMarkerDragEnd = useCallback(
    ({ lngLat: { lng, lat } }) => {
      setDataDrawing({ lng, lat });
      setMarker({ latitude: lat, longitude: lng });
      onDropMarker && onDropMarker({ latitude: lat, longitude: lng })
    },
    [onDropMarker, setDataDrawing]
  );

  return (
    <Marker
      longitude={marker.longitude}
      latitude={marker.latitude}
      anchor="bottom"
      offset={[0, -10]}
      draggable={editing}
      // onDragStart={onMarkerDragStart}
      // onDrag={onMarkerDrag}
      onDragEnd={onMarkerDragEnd}
    >
      <Pin size={50} />
    </Marker>
  );
};

export default LocationMarker;
