import classnames from 'classnames';
import Icon from 'components/ui/icon';
import WidgetHeader from 'components/widgets/header';

const AnalysisTable = () => {
  const isEmbed = false;
  const rows = [
    {
      col1: 'Value',
      col2: 'Value',
      col3: 'Value',
      col4: 'Value',
      col5: 'Value',
      col6: 'Value',
    },
    {
      col1: 'Value',
      col2: 'Value',
      col3: 'Value',
      col4: 'Value',
      col5: 'Value',
      col6: 'Value',
    },
    {
      col1: 'Value',
      col2: 'Value',
      col3: 'Value',
      col4: 'Value',
      col5: 'Value',
      col6: 'Value',
    },
  ];
  const columns = [
    { field: 'col1', label: 'Column' },
    { field: 'col2', label: 'Column' },
    { field: 'col3', label: 'Column' },
    { field: 'col4', label: 'Column' },
    { field: 'col5', label: 'Column' },
    { field: 'col6', label: 'Column' },
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
        <WidgetHeader widget={{ name: 'Layer Analysis Table' }} />
      </div>
      <div className="c-a-table">
        <table>
          <thead>
            <tr>
              <th>
                <span className="align-middle">
                  <Icon name="icon-ellipsis" className="table-action" />
                </span>
                Name
              </th>
              {columns.map((c, i) => (
                <th key={i}>
                  <div className="flex items-start">
                    <span className="align-middle">
                      <Icon name="icon-ellipsis" className="table-action" />
                    </span>
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
                <td>Location Name</td>
                {Object.entries(r).map(([k, v], i) => (
                  <td key={k}>{`${v}${i ? ' ' + i : ''}`}</td>
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
