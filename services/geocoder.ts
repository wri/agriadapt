import { GEOCODEAPI } from '../utils/axios';

export const forwardGeocode = async (search: string, language?: 'en') => {
  const params = {
    autocomplete: true,
    fuzzyMatch: true,
    language,
    access_token: process.env.NEXT_PUBLIC_RW_MAPBOX_API_TOKEN,
  };

  return await GEOCODEAPI.get(`/${search}.json`, {
    params,
  })
    .then(({ data: { features } }) => features)
    .catch((err) => {
      console.warn(err);
    });
};
