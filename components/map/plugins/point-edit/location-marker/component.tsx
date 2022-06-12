import React, { useCallback, useState } from 'react';
import { Marker } from 'react-map-gl';
import Pin from './pin';

const LocationMarker = ({
  location: { latitude, longitude, label = null, editing },
  setDataDrawing,
}) => {
  const [marker, setMarker] = useState({ latitude, longitude });

  const onMarkerDragEnd = useCallback(
    ({ lngLat }) => {
      setDataDrawing(lngLat);
      setMarker({ latitude: lngLat[1], longitude: lngLat[0] });
    },
    [setDataDrawing]
  );

  return (
    <Marker
      longitude={marker.longitude}
      latitude={marker.latitude}
      // anchor="top"
      draggable={editing}
      // onDragStart={onMarkerDragStart}
      // onDrag={onMarkerDrag}
      onDragEnd={onMarkerDragEnd}
    >
      {label && (
        <div
          style={{
            color: 'white',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -60%)',
          }}
        >
          {label}
        </div>
      )}
      <Pin size={50} />
    </Marker>
  );
};

export default LocationMarker;
