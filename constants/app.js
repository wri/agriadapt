export const TRANSIFEX_BLACKLIST = [
  '/app/embed/EmbedDashboard',
  '/app/embed/EmbedMap',
  '/app/embed/EmbedTable',
  '/app/embed/EmbedText',
  '/app/embed/EmbedWidget',
  '/app/embed/EmbedEmbed',
  '/app/embed/EmbedDataset',
  '/app/embed/EmbedSimilarDatasets',
  '/app/explore/embed',
];

export const FULLSCREEN_PAGES = ['/data/pulse', '/sign-in', '/explore'];

const GADM_COUNTRIES_TABLENAME = 'gadm36_countries';
const GADM_ADM1_TABLENAME = 'gadm36_adm1';

export const GADM_COUNTIRES_DATASET_ID = 'a8dc9474-ba42-4ae3-a7d3-d8df5f1e78df';

export const GADM_COUNTRIES_SQL = `SELECT iso, name_0 from ${GADM_COUNTRIES_TABLENAME}`;

export const GADM_ADMONE_DATSET_ID = '8f22dec5-2aea-49d6-8a7b-c494dbb8095c';

export const GADM_ADMONE_SQL = `SELECT name_1, gid_1 from ${GADM_ADM1_TABLENAME} where iso = `;

export const HOTJAR_ROUTES = ['/data/explore'];
