import Icon from 'components/ui/icon';
import { useCallback, useState } from 'react';
import AnalysisDropdownMenu from '../explore-analysis/dropdown-menu/component';
import RenameField from '../explore-analysis/rename-field/component';

const ExploreAnalysisLocation = ({
  label,
  index,
  renameLocation,
  removeLocation,
  setEditIndex,
}) => {
  const [renaming, setRenaming] = useState(false);

  const handleEdit = () => setEditIndex(index);
  const handleDelete = () => removeLocation(index);
  const handleRename = useCallback((newName, e) => {
    if (newName.trim().length) {
      renameLocation({ index, rename: newName.trim() });
      setRenaming(false);
    }
    else if (e.type !== 'submit') setRenaming(false);
  }, [index, renameLocation,]);

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
      onClick: () => setRenaming(true),
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
      {!renaming && <div className="c-location-label">{label}</div>}
      {renaming && (
        <RenameField handleRename={handleRename} defaultVal={label} />
      )}
    </div>
  );
};

export default ExploreAnalysisLocation;
