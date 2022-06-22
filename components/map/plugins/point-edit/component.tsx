import React from 'react';
import { AnalysisLocation, PointLocation } from 'types/analysis';
import LocationMarker from './location-marker';

const PointEdit = ({
  loc_map: locations,
  drawer: { data: pointData, isDrawing },
  geoLocator: { data: geoLocatorData, isGeoLocating },
}) => {
  const points = Object.values(locations).filter(
    (l: AnalysisLocation) =>
      !['admin'].includes(l.type) && !l.editing
  );

  return (
    <>
      {((isDrawing && !!pointData) || (isGeoLocating && !!geoLocatorData)) && (
        <LocationMarker
          location={{
            longitude: isDrawing ? pointData.lng : geoLocatorData.longitude,
            latitude: isDrawing ? pointData.lat : geoLocatorData.latitude,
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
