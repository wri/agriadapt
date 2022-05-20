import Field from 'components/form/Field';
import Icon from 'components/ui/icon';
import useRadio from 'hooks/form/useRadio';
import { useCallback, useEffect, useRef, useState } from 'react';
import AnalysisDropdownMenu from '../explore-analysis/dropdown-menu/component';

const ExploreAnalysisLocation = ({
  label,
  index,
  renameLocation,
  removeLocation,
  setEditIndex,
}) => {
  const [renaming, setRenaming] = useState(false);
  const newName = useRadio(label);
  const renameRef = useRef(null);

  const handleEdit = () => setEditIndex(index);
  const handleDelete = () => removeLocation(index);
  const handleRename = useCallback(() => {
    renameLocation({ index, rename: newName.value });
    setRenaming(false);
  }, [index, renameLocation, newName.value]);

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

  const handleClickAway = useCallback((e) => {
    if (renameRef.current && renameRef.current !== e.target)
      handleRename();
  }, [renameRef, handleRename]);

  useEffect(() => {
    document.addEventListener('click', handleClickAway, true);
    return () => document.removeEventListener('click', handleClickAway, true);
  }, [handleClickAway]);

  return (
    <div className="c-analysis-location">
      <AnalysisDropdownMenu options={options} />
      {!renaming && <div className="c-location-label">{label}</div>}
      {renaming && (
        <form className="c-rename" onSubmit={handleRename}>
          <input ref={renameRef} {...newName} />
        </form>
      )}
      {/* {renaming && <div className="c-location-rename"><input /></div>} */}
    </div>
  );
};

export default ExploreAnalysisLocation;
