import classnames from 'classnames';
import Icon from 'components/ui/icon';
import WidgetHeader from 'components/widgets/header';
import { useMemo } from 'react';
import { AnalysisLocation } from 'types/analysis';
import AnalysisDropdownMenu from '../dropdown-menu/component';

const AnalysisTable = ({ map: locations }) => {
  const isEmbed = false;
  const rows = useMemo(
    () =>
      Object.values(locations).map((l: AnalysisLocation) => ({
        name: l.label,
        attributes: {
          col1: 'Value',
          col2: 'Value',
          col3: 'Value',
          col4: 'Value',
          col5: 'Value',
          col6: 'Value',
        },
      })),
    [locations]
  );

  const columns = [
    { field: 'col1', label: 'Column' },
    { field: 'col2', label: 'Column' },
    { field: 'col3', label: 'Column' },
    { field: 'col4', label: 'Column' },
    { field: 'col5', label: 'Column' },
    { field: 'col6', label: 'Column' },
  ];

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
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td>{r.name}</td>
                {Object.entries(r.attributes).map(([k, v], i) => (
                  <td key={k}>{`${v} ${i + 1}`}</td>
                ))}
              </tr>
            ))}
            <tr>
              <td>
                Resolution{' '}
                <span>
                  <Icon name="icon-info" className="table-action" />
                </span>
              </td>
              {columns.map((c, i) => (
                <td key={i}>11 sq kilometers</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AnalysisTable;
