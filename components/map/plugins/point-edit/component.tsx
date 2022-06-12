import React from 'react';
import { AnalysisLocation, PointLocation } from 'types/analysis';
import LocationMarker from './location-marker';

const PointEdit = ({ map, data: lngLat, isDrawing }) => {
  const points = Object.values(map).filter(
    (l: AnalysisLocation) => l.type === 'point'
  );

  return (
    <>
      {isDrawing && lngLat && (
        <LocationMarker
          location={{
            longitude: lngLat.lng,
            latitude: lngLat.lat,
            editing: isDrawing,
          }}
        />
      )}
      {points.map((l: PointLocation) => (
        <LocationMarker key={l.id} location={l} />
      ))}
    </>
  );
};

export default PointEdit;
