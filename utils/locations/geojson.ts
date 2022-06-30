import { AnalysisLocation } from "types/analysis";

export const toGeoJSON = (location: AnalysisLocation) => {
    if (location.type !== 'admin')
      return {
        type: 'Point',
        coordinates: [location.longitude, location.latitude],
      };
  };