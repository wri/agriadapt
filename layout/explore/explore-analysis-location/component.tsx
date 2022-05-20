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
    if (newName.value.trim().length) {
      renameLocation({ index, rename: newName.value });
      setRenaming(false);
    }
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

  useEffect(() => {
    if (renaming && renameRef.current) renameRef.current.select();
  }, [renaming]);

  const handleClickAway = useCallback(
    (e) => {
      if (renameRef.current && renameRef.current !== e.target) handleRename();
      setRenaming(false);
    },
    [renameRef, handleRename]
  );

  const handleSubmit = (e) => {
    handleRename();
    e.preventDefault();
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickAway, true);
    return () =>
      document.removeEventListener('mousedown', handleClickAway, true);
  }, [handleClickAway]);

  return (
    <div className="c-analysis-location">
      <AnalysisDropdownMenu options={options} />
      {!renaming && <div className="c-location-label">{label}</div>}
      {renaming && (
        <form className="c-rename" onSubmit={handleSubmit}>
          <input ref={renameRef} {...newName} />
        </form>
      )}
    </div>
  );
};

export default ExploreAnalysisLocation;
