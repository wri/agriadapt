import WRISerializer from 'wri-json-api-serializer';

// utils
import { WRIAPI } from 'utils/axios';
import { logger } from 'utils/logs';

// API docs: https://resource-watch.github.io/doc-api/index-rw.html#dataset
/**
 * Fetchs datasets according to params.
 * Check out the API docs for this endpoint {@link https://resource-watch.github.io/doc-api/index-rw.html#getting-all-datasets|here}
 * @param {Object} params Request paremeters.
 * @param {Object} headers Request headers.
 * @param {boolean} _meta Boolean flag indicating whether the meta object should
 * be included in the response or not.
 * @returns {any} Array of serialized datasets.
 */
export const fetchDatasets = (params = {}, headers = {}, _meta = false) => {
  const newParams = {
    env: process.env.NEXT_PUBLIC_API_ENV,
    application: process.env.NEXT_PUBLIC_APPLICATIONS,
    ...params,
  };
  return WRIAPI.get('/v1/dataset', {
    headers: {
      ...WRIAPI.defaults.headers,
      // TO-DO: forces the API to not cache, this should be removed at some point
      'Upgrade-Insecure-Requests': 1,
      ...headers,
    },
    params: newParams,
    transformResponse: [].concat(
      WRIAPI.defaults.transformResponse,
      ({ data, meta }) => ({
        datasets: data,
        meta,
      })
    ),
  })
    .then((response) => {
      const { status, statusText, data } = response;
      const { datasets, meta } = data;

      if (status >= 300) {
        logger.error('Error fetching datasets:', `${status}: ${statusText}`);
        throw new Error(statusText);
      }

      if (_meta) {
        return {
          datasets: WRISerializer({ data: datasets }),
          meta,
        };
      }

      return WRISerializer({ data: datasets });
    })
    .catch((response) => {
      const { status, statusText } = response;

      logger.error(`Error fetching datasets: ${status}: ${statusText}`);
      throw new Error(`Error fetching datasets: ${status}: ${statusText}`);
    });
};

/**
 * Fetches a dataset by id.
 * Check out the API docs for this endpoint {@link https://resource-watch.github.io/doc-api/index-rw.html#how-to-get-a-dataset-by-id|here}
 * @param {String} id - dataset id.
 * @param {Object} params - params sent to the API.
 * @returns {Object} serialized specified dataset.
 */
export const fetchDataset = async (id, params = {}) => {
  if (!id) throw Error('dataset id is mandatory to perform this fetching.');
  logger.info(`Fetch dataset: ${id}`);

  return WRIAPI.get(`/v1/dataset/${id}`, {
    headers: {
      ...WRIAPI.defaults.headers,
      // TO-DO: forces the API to not cache, this should be removed at some point
      'Upgrade-Insecure-Requests': 1,
    },
    params: {
      env: process.env.NEXT_PUBLIC_API_ENV,
      ...params,
    },
  })
    .then((response) => {
      const { status, statusText, data } = response;

      if (status >= 300) {
        if (status === 404) {
          logger.debug(`Dataset '${id}' not found, ${status}: ${statusText}`);
        } else {
          logger.error(
            `Error fetching dataset: ${id}: ${status}: ${statusText}`
          );
        }
        throw new Error(statusText);
      }

      const serialized = WRISerializer(data);

      const dataset = {
        ...serialized,
        ...(serialized.layer && {
          layer: serialized.layer?.map((l) => ({
            ...l,
            applicationConfig:
              l.applicationConfig[process.env.NEXT_PUBLIC_APPLICATIONS] || {},
          })),
        }),
      };
      return dataset;
    })
    .catch(({ response }) => {
      const { status, statusText } = response;

      logger.error(`Error fetching dataset ${id}: ${status}: ${statusText}`);
      throw new Error(`Error fetching dataset ${id}: ${status}: ${statusText}`);
    });
};

/**
 * Get dataset tags.
 * Check out the API docs for this endpoint {@link https://resource-watch.github.io/doc-api/index-rw.html#getting-vocabularies-associated-to-a-resource|here}
 * @param {String} datasetId - dataset id.
 * @param {Object} params - params sent to the API.
 * @returns {Object}
 */
export const fetchDatasetTags = (datasetId, params = {}) => {
  logger.info(`Fetch dataset tags: ${datasetId}`);
  return WRIAPI.get(`/v1/dataset/${datasetId}/vocabulary`, {
    headers: { 'Upgrade-Insecure-Requests': 1 },
    params: {
      env: process.env.NEXT_PUBLIC_API_ENV,
      ...params,
    },
  })
    .then((response) => WRISerializer(response.data))
    .catch((response) => {
      const { status, statusText } = response;
      logger.error(
        `Error fetching dataset tags ${datasetId}: ${status}: ${statusText}`
      );
      throw new Error(
        `Error fetching dataset tags ${datasetId}: ${status}: ${statusText}`
      );
    });
};
