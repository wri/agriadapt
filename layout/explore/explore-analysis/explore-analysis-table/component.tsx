import axios from 'axios';
import classnames from 'classnames';
import Icon from 'components/ui/icon';
import WidgetHeader from 'components/widgets/header';
import { replace } from "layer-manager";
import { useEffect, useMemo, useState } from 'react';
import { AnalysisLocation } from 'types/analysis';
import AnalysisDropdownMenu from '../dropdown-menu/component';
import Spinner from "components/ui/Spinner";

const AnalysisTable = ({ loc_map: locations, layerGroups }) => {
  const isEmbed = false;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const interactions = useMemo(() => {
    return [].concat(
      ...layerGroups.map((l) => l.layers.map((l) => l.interactionConfig))
    );
  }, [layerGroups]);

  const columns = useMemo(
    () =>
      [].concat(
        ...interactions.map(({ output }) =>
          output.map((o) => ({
            field: o.column,
            label: o.property,
          }))
        )
      ),
    [interactions]
  );

  /* Grabbing data with multiple promises (not ideal) */
  useEffect(() => {
    setLoading(true);
    Promise.all(
      Object.values(locations).map((l: AnalysisLocation) => {
        const latlng = { lat: l.latitude, lng: l.longitude };
        return Promise.allSettled(
          interactions.map(({ config, output }) => {
            if (config)
              return axios.get(replace(config.url, latlng)).then(({ data }) => {
                return { interactions: data.data, output: output };
              });
            else return Promise.resolve({ interactions: [], output: [] });
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
            attributes: d.data.reduce((obj, { interactions = [], output = [] }, i) => {
              const colArr = output[i]?.column.split('.') || [];
              const val = colArr.reduce((acc, c) => acc[c], interactions[i]) || 'N/A';
              return obj[`col${i + 1}`] = String(val);
            }, {}),
          };
        })
      ,
    [data]
  );

  // const rows = useMemo(
  //   () =>
  //     Object.values(locations).map((l: AnalysisLocation) => {
  //       return {
  //         name: l.label,
  //         attributes: {
  //           col1: 'Value',
  //           col2: 'Value',
  //           col3: 'Value',
  //           col4: 'Value',
  //           col5: 'Value',
  //           col6: 'Value',
  //         },
  //       };
  //     }),
  //   [locations]
  // );

  // const columns = [
  //   { field: 'col1', label: 'Column' },
  //   { field: 'col2', label: 'Column' },
  //   { field: 'col3', label: 'Column' },
  //   { field: 'col4', label: 'Column' },
  //   { field: 'col5', label: 'Column' },
  //   { field: 'col6', label: 'Column' },
  // ];

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
                    <div className="w-full text-ellipsis overflow-x-hidden">
                      <span className="float-right">
                        <Icon name="icon-info" className="table-action" />
                      </span>
                      <span>{c.label}</span>
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
                  {Object.entries(r.attributes).map(([k, v]) => (
                    <td key={k}>{`${v}`}</td>
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
