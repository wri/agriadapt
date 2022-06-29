import classnames from 'classnames';
import Icon from 'components/ui/icon';
import WidgetHeader from 'components/widgets/header';
import { replace } from "layer-manager";
import { useEffect, useMemo, useState } from 'react';
import { AnalysisLocation } from 'types/analysis';
import AnalysisDropdownMenu from '../dropdown-menu/component';
import Spinner from "components/ui/Spinner";
import { fetchDatasetQuery } from 'services/query';
import { APILayerSpec } from 'types/layer';
import { appConfigs } from 'constants/app-config-template';
import { toGeoJSON } from 'utils/locations/geojson';
import { createColorValueMap, legendConfigItem } from 'utils/layers/symbolizer';

const AnalysisTable = ({ loc_map: locations, layerGroups }) => {
  const isEmbed = false;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const interactions = useMemo(
    () =>
      [].concat(...layerGroups.map((g) =>
        g.layers.reduce((arr, l: APILayerSpec) => {
          const legendItems = l.legendConfig.items as legendConfigItem[];
          arr.push({
            // TODO: Remove app config template once no longer testing
            ...(appConfigs[l.id]
              ? { ...appConfigs[l.id] }
              : { ...l.applicationConfig }),
            label: l.name,
            dataset: l.dataset,
            ...(l.layerConfig.type == 'raster' && { valueMap: createColorValueMap(l.layerConfig.body.sldValue, legendItems )})
          });
          return arr;
        }, [])
      )),
    [layerGroups]
  );

  const columns = useMemo(
    () => [].concat(...interactions.map(({ label }) => label)),
    [interactions]
  );

  useEffect(() => {
    setLoading(true);
    Promise.all(
      Object.values(locations).map((l: AnalysisLocation) => {
        const geo = {
          geojson: encodeURIComponent(JSON.stringify(toGeoJSON(l))),
        };

        return Promise.allSettled(
          interactions.map(({ dataset, query, output, valueMap }) => {
            const encoded = replace(query, geo);
              return fetchDatasetQuery(dataset, encoded)
                .then(({ data }) => {
                  return {
                    interactions: data.data,
                    output: output,
                    ...(valueMap && { valueMap }),
                  };
                })
                .catch(() => ({ interactions: [] }));
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

  const rows = useMemo(
    () =>
      data.map((d) => {
        return {
          name: d.label,
          attributes: d.data.reduce(
            (arr: string[], { interactions = [], output, valueMap }) => {
              const colArr = output?.path.split('.') || [];
              const val =
                colArr.reduce((acc, c) => acc[c], interactions[0]) || 'N/A';
              arr.push(valueMap ? valueMap[val] : String(val));
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
