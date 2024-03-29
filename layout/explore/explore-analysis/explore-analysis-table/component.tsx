import classnames from 'classnames';
import Icon from 'components/ui/icon';
import WidgetHeader from 'components/widgets/header';
import { replace } from 'layer-manager';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnalysisLocation } from 'types/analysis';
// import AnalysisDropdownMenu from '../dropdown-menu/component';
import Spinner from 'components/ui/Spinner';
import { fetchDatasetQuery } from 'services/query';
import { APILayerSpec } from 'types/layer';
import { toGeoJSON } from 'utils/locations/geojson';
import { createColorValueMap, legendConfigItem } from 'utils/layers/symbolizer';
import { useTranslation } from 'next-i18next';
import { exportToCSV, makeRows } from './utils';
import { useRouter } from 'next/router';
import Link from 'next/link';

const AnalysisTable = ({
  loc_map: locations,
  layerGroups,
  setDomains,
  setVisCols,
  setValueMaps,
  setOutputs,
  loading,
  setLoading,
}) => {
  const [data, setData] = useState([]);
  const [resolutions, setResolutions] = useState([]);

  const [abortController, setAbortController] = useState<AbortController>();
  
  /**
   * Cancel any remaining requests whenever table dismounts
   */
  useEffect(() => {
    return () => abortController?.abort();
  }, [abortController]);

  const interactions = useMemo(() => {
    const valueMaps = [];
    const outputs = [];
    const res = [];
    const arr = [].concat(
      ...layerGroups.map((g) =>
        g.layers.reduce((arr: any[], l: APILayerSpec) => {
          if (!l.active) return arr;
          const legendItems = l.legendConfig.items as legendConfigItem[];
          const valueMap =
            l.layerConfig.type == 'raster'
              ? createColorValueMap(l.layerConfig.body.sldValue, legendItems)
              : null;
          valueMaps.push(valueMap);
          outputs.push(l.applicationConfig.output);
          res.push(g.resolution ?? 'N/A');
          // TODO: Find out why time slider does not destructure out correct appConfig
          const appConfig =
            l.applicationConfig[process.env.NEXT_PUBLIC_APPLICATIONS] ||
            l.applicationConfig;
          arr.push({
            ...appConfig,
            label: l.name,
            dataset: l.dataset,
            year: l.layerConfig.order,
            ...(l.layerConfig.type == 'raster' && {
              valueMap,
            }),
          });
          return arr;
        }, [])
      )
    );
    setValueMaps(valueMaps);
    setOutputs(outputs);
    setResolutions(res);
    return arr;
  }, [layerGroups, setOutputs, setValueMaps]);

  const columns = useMemo(() => {
    const cols = [].concat(
      ...interactions.map(({ label, dataset }) => ({ label, dataset }))
    );
    setVisCols(cols.map(({ label }) => label));
    return cols;
  }, [interactions, setVisCols]);

  const fetchTableData = useCallback((signal: AbortSignal) => {
    return Promise.all(
      Object.values(locations).map((l: AnalysisLocation) => {
        const params = {
          geojson: encodeURIComponent(JSON.stringify(toGeoJSON(l))),
          iso: l.iso,
          country:
            l.iso === 'USA'
              ? `'United States', 'United States of America'`
              : `'${l.country}'`,
        };

        // Evaluating application layer's config query
        return Promise.allSettled(
          interactions.map(({ dataset, query, output, valueMap, year }) => {
            const encoded = replace(query, { ...params, year });
            return fetchDatasetQuery(dataset, encoded, signal)
              .then(({ data }) => {
                return {
                  interaction: data.data[0],
                  output: output,
                  ...(valueMap && { valueMap }),
                };
              })
              .catch(() => ({ interaction: 'N/A' }));
          })
          // eslint-disable-next-line
          // @ts-ignore
        ).then((r) => ({ loc: l, data: r.map(({ value }) => value) }));
      })
    )
  }, [interactions, locations]);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    setAbortController((a) => {
      a?.abort();
      return controller;
    });

    setLoading(true);
    fetchTableData(signal)
      .then((r) => {
        setData(r.map((d) => ({ ...d.loc, data: d.data })));
      })
      .finally(() => setLoading(false));
  }, [fetchTableData, setLoading]);

  const rows = useMemo(() => makeRows(data),[data]);

  /* Set analysis visuals domains from rows */
  useEffect(() => {
    const domains = new Array(columns.length).fill([]);
    rows.forEach(({ attributes, numAttributes }) => {
      for (let j = 0; j < numAttributes?.length; j++) {
        domains[j] = [
          ...(domains[j] || []),
          { label: attributes[j], value: numAttributes[j] },
        ];
      }
    });
    setDomains(domains);
  }, [columns, rows, setDomains]);

  // const options = [
  //   {
  //     id: 'change-column-name',
  //     label: 'explore:analysis.Change Column Name',
  //     onClick: () => undefined,
  //   },
  //   { id: 'sort-a-z', label: 'explore:analysis.Sort by Column A-Z', onClick: () => undefined },
  //   { id: 'delete', label: 'explore:analysis.Delete', onClick: () => undefined },
  // ];

  const { t } = useTranslation(['explore', 'common']);
  const router = useRouter();

  const datasetUrl = (dataset) => ({
    pathname: `/explore/${dataset}`,
    query: { ...router.query, tab: 'layers' },
  });

  const handleDownload = useCallback(
    () =>
      exportToCSV(
        rows,
        columns.map(({ label }) => label)
      ),
    [rows, columns]
  );

  const canDownload = useMemo(
    () => !!(rows?.length && columns?.length),
    [rows, columns]
  );

  return (
    <div
      className={classnames(
        'c-widget c-analysis-table border rounded border-gray-light'
      )}
    >
      <div className="p-4 border-b border-gray-light widget-header-container">
        <WidgetHeader
          download={canDownload}
          widget={{
            name: t('explore:analysis.Layer Analysis Table'),
            id: 'analysis-table',
          }}
          onDownload={handleDownload}
          // onToggleInfo={() => undefined}
          // onToggleShare={() => undefined}
        />
      </div>
      <div className="c-a-table">
        <table>
          <thead>
            <tr>
              <th>
                {/* <AnalysisDropdownMenu
                  options={options.map((o) => ({ ...o, label: t(o.label) }))}
                /> */}
                {t('explore:analysis.Name')}
              </th>
              {columns.map((c, i) => (
                <th key={i}>
                  <div className="flex items-start">
                    {/* <AnalysisDropdownMenu options={options.map((o) => ({ ...o, label: t(o.label) }))} /> */}
                    <div className="w-full">
                      <span className="float-right">
                        <Link passHref href={datasetUrl(c.dataset)}>
                          <a>
                            <Icon name="icon-info" className="table-action" />
                          </a>
                        </Link>
                      </span>
                      <span className="line-clamp-2">{c.label}</span>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          {!loading && (
            <tbody>
              {rows.map((r, i) => (
                <tr key={i}>
                  <td>{r.name}</td>
                  {r.attributes?.map((val: string, i: number) => (
                    <td key={i}>{val}</td>
                  ))}
                </tr>
              ))}
              <tr>
                <td>
                  {t('Resolution')}
                  {/* <span>
                    <Icon name="icon-info" className="table-action" />
                  </span> */}
                </td>
                {resolutions.map((r, i) => (
                  <td key={`${i}-${r}`}>{r}</td>
                ))}
              </tr>
            </tbody>
          )}
        </table>
        {loading && (
          <Spinner isLoading={loading} className="-transparent" />
        )}
      </div>
    </div>
  );
};

export default AnalysisTable;
