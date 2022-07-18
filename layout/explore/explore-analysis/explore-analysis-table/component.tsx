import classnames from 'classnames';
import Icon from 'components/ui/icon';
import WidgetHeader from 'components/widgets/header';
import { replace } from 'layer-manager';
import { useEffect, useMemo, useState } from 'react';
import { AnalysisLocation } from 'types/analysis';
import AnalysisDropdownMenu from '../dropdown-menu/component';
import Spinner from 'components/ui/Spinner';
import { fetchDatasetQuery } from 'services/query';
import { APILayerSpec } from 'types/layer';
// import { appConfigs } from 'constants/app-config-template';
import { toGeoJSON } from 'utils/locations/geojson';
import { createColorValueMap, legendConfigItem } from 'utils/layers/symbolizer';

const AnalysisTable = ({ loc_map: locations, layerGroups }) => {
  const isEmbed = false;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const interactions = useMemo(
    () =>
      [].concat(
        ...layerGroups.map((g) =>
          g.layers.reduce((arr, l: APILayerSpec) => {
            if (!l.active) return arr;
            const legendItems = l.legendConfig.items as legendConfigItem[];
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
                valueMap: createColorValueMap(
                  l.layerConfig.body.sldValue,
                  legendItems
                ),
              }),
            });
            return arr;
          }, [])
        )
      ),
    [layerGroups]
  );

  useEffect(() => {
    console.log(interactions);
  }, [interactions])

  const columns = useMemo(
    () => [].concat(...interactions.map(({ label }) => label)),
    [interactions]
  );

  useEffect(() => {
    setLoading(true);
    Promise.all(
      Object.values(locations).map((l: AnalysisLocation) => {
        const params = {
          geojson: encodeURIComponent(JSON.stringify(toGeoJSON(l))),
          iso: l.iso,
          country: l.country,
        };

        return Promise.allSettled(
          interactions.map(({ dataset, query, output, valueMap, year }) => {
            const encoded = replace(query, { ...params, year });
            return fetchDatasetQuery(dataset, encoded)
              .then(({ data }) => {
                return {
                  interaction: data.data[0],
                  output: output,
                  ...(valueMap && { valueMap }),
                };
              })
              .catch(() => ({ interaction: 'N/A' }));
          })
          // TODO: Figure out why typescript does not think "value" property exists here
          // eslint-disable-next-line
          // @ts-ignore
        ).then((r) => ({ loc: l, data: r.map(({ value }) => value) }));
      })
    )
      .then((r) => {
        setData(r.map((d) => ({ ...d.loc, data: d.data })));
      })
      .finally(() => setLoading(false));
  }, [interactions, locations]);

  const formatValue = (
    val: number | string | undefined,
    output = null,
    valueMap = null
  ) => {
    let result = '';
    if (val == null) return 'N/A';
    if (!output) return String(val);
    if (valueMap && output.type === 'string') result = valueMap[val];
    else if (output.type === 'string' && typeof val === 'string') result = val;

    if (output.type === 'number' && typeof val === 'number') {
      const places = output.format?.split('.')[1]?.length || 0;
      result = val.toFixed(places);
    }

    if (output.prefix) result = `${output.prefix}${result}`;
    if (output.suffix) result = `${result}${output.suffix}`;
    return result;
  };

  const rows = useMemo(
    () =>
      data.map((d) => {
        return {
          name: d.label,
          attributes: d.data.reduce(
            (arr: string[], { interaction = {}, output, valueMap }) => {
              const colArr = output?.path.split('.') || [];
              const val = colArr.reduce(
                (acc: Record<string, any>, c: string) => acc[c],
                interaction
              ) || interaction[output.path];
              arr.push(formatValue(val, output, valueMap));
              return arr;
            },
            []
          ),
        };
      }),
    [data]
  );

  const options = [
    {
      id: 'change-column-name',
      label: 'Change Column Name',
      onClick: () => undefined,
    },
    { id: 'sort-a-z', label: 'Sort by Column A-Z', onClick: () => undefined },
    { id: 'delete', label: 'Delete', onClick: () => undefined },
  ];
  return (
    <div
      className={classnames(
        'c-widget c-analysis-table border rounded border-gray-light',
        {
          '-is-embed': isEmbed,
        }
      )}
    >
      <div className="p-4 border-b border-gray-light widget-header-container">
        <WidgetHeader
          download
          widget={{ name: 'Layer Analysis Table', id: 'analysis-table' }}
          onToggleInfo={() => undefined}
          onToggleShare={() => undefined}
        />
      </div>
      <div className="c-a-table">
        <table>
          <thead>
            <tr>
              <th>
                <AnalysisDropdownMenu options={options} />
                Name
              </th>
              {columns.map((c, i) => (
                <th key={i}>
                  <div className="flex items-start">
                    <AnalysisDropdownMenu options={options} />
                    <div className="w-full">
                      <span className="float-right">
                        <Icon name="icon-info" className="table-action" />
                      </span>
                      <span className="line-clamp-2">{c}</span>
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
                  {r.attributes.map((val: string, i: number) => (
                    <td key={i}>{val}</td>
                  ))}
                </tr>
              ))}
              {/* <tr>
                <td>
                  Resolution{' '}
                  <span>
                    <Icon name="icon-info" className="table-action" />
                  </span>
                </td>
                {columns.map((c, i) => (
                  <td key={i}>11 sq kilometers</td>
                ))}
              </tr> */}
            </tbody>
          )}
          {loading && (
            <tbody>
              <Spinner isLoading={loading} className="-transparent" />
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default AnalysisTable;
