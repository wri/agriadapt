import Icon from 'components/ui/icon';
import AnalysisDropdownMenu from '../explore-analysis/dropdown-menu/component';

const ExploreAnalysisLocation = ({
  label,
  index,
  renameLocation,
  removeLocation,
  setEditIndex,
}) => {
  const handleEdit = () => setEditIndex(index);
  const handleRename = () => renameLocation({ index, rename: 'Test Rename' });
  const handleDelete = () => {
    removeLocation(index);
  };

  const options = [
    {
      id: 'edit-location',
      label: (
        <div className="c-analysis-icon-option">
          <span className="align-middle">
            <Icon name="icon-pencil" className="" />
          </span>
          <span>Edit Location</span>
        </div>
      ),
      onClick: handleEdit,
    },
    {
      id: 'customize-name',
      label: (
        <div className="c-analysis-icon-option">
        <span className="align-middle">
            <Icon name="icon-marker" className="" />
          </span>
          <span>Customize Name</span>
        </div>
      ),
      onClick: handleRename,
    },
    {
      id: 'delete',
      label: (
        <div className="c-analysis-icon-option">
          <span className="align-middle">
            <Icon name="icon-bin-simple" className="" />
          </span>
          <span>Delete Location</span>
        </div>
      ),
      onClick: handleDelete,
    },
  ];

  return (
    <div className="c-analysis-location">
      <AnalysisDropdownMenu options={options} />
      <div className="c-location-label">{label}</div>
    </div>
  );
};

export default ExploreAnalysisLocation;
