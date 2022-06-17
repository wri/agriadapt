import React from 'react';
import { AnalysisLocation, PointLocation } from 'types/analysis';
import LocationMarker from './location-marker';

const PointEdit = ({ loc_map: locations, data: lngLat, isDrawing }) => {
  const points = Object.values(locations).filter(
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
