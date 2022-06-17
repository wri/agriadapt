import React, { useCallback, useState } from 'react';
import { Marker } from 'react-map-gl';
import Pin from './pin';

const LocationMarker = ({
  location: { latitude, longitude, label = null, editing },
  setDataDrawing,
}) => {
  const [marker, setMarker] = useState({ latitude, longitude });

  const onMarkerDragEnd = useCallback(
    ({ lngLat: { lng, lat } }) => {
      setDataDrawing({ lng, lat });
      setMarker({ latitude: lat, longitude: lng });
    },
    [setDataDrawing]
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
