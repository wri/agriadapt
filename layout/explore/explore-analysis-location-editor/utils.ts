import { reverseGeocode } from 'services/geocoder';
import isoJSON from 'i18n-iso-countries/langs/en.json';
import i18nIso from 'i18n-iso-countries';

i18nIso.registerLocale(isoJSON);

export const getGeocodeInfo = async (data, locale: string) => {
  let label = '',
    country = '';
  const results = await reverseGeocode(Object.values(data), String(locale));
  if (!results.length) return null;

  label = results[0].place_name;
  country = results.at(-1).place_name;

  return {
    label,
    country,
    iso: getIso(country, locale),
  };
};

export const getIso = (country, locale) => {
    return i18nIso.getAlpha3Code(country, locale);
}

export const makePointLocation = (type = 'point', info, coords) => {
  const { country, label, iso } = info;
  return {
    type,
    label,
    iso,
    country,
    longitude: coords.longitude ?? coords.lng,
    latitude: coords.latitude ?? coords.lat
  }
}