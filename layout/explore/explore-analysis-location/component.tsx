import AnalysisDropdownMenu from '../explore-analysis/dropdown-menu/component';

const ExploreAnalysisLocation = ({ label, index, removeLocation, setEditIndex }) => {
  const handleEdit = () => setEditIndex(index);
  const handleRename = () => undefined;
  const handleDelete = () => {
    removeLocation(index);
  };

  const options = [
    { id: 'edit-location', label: <div>Edit Location</div>, onClick: handleEdit },
    { id: 'customize-name', label: <div>Customize Name</div>, onClick: handleRename },
    { id: 'delete', label: <div>Delete Location</div>, onClick: handleDelete },
  ];

  return (
    <div className="c-analysis-location">
      <AnalysisDropdownMenu options={options} />
      <div className="c-location-label">
        {label}
      </div>
    </div>
  );
};

export default ExploreAnalysisLocation;
