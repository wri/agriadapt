import Icon from 'components/ui/icon';
import { useTranslation } from 'next-i18next';
import { useCallback, useState } from 'react';
import AnalysisDropdownMenu from '../explore-analysis/dropdown-menu/component';
import RenameField from '../explore-analysis/rename-field/component';

const ExploreAnalysisLocation = ({
  id,
  label = '',
  renameLocation,
  removeLocation,
  setEditing,
}) => {
  const { t } = useTranslation(['explore', 'common']);

  const [renaming, setRenaming] = useState(false);

  const handleEdit = () => {
    setEditing({ id, editing: true });
  };
  const handleDelete = () => {
    removeLocation(id);
  };
  const handleRename = useCallback(
    (newName, e) => {
      if (newName.trim().length) {
        renameLocation({ id, rename: newName.trim() });
        setRenaming(false);
      } else if (e.type !== 'submit') setRenaming(false);
    },
    [id, renameLocation]
  );

  const options = [
    {
      id: 'edit-location',
      label: (
        <div className="c-analysis-icon-option">
          <span className="align-middle">
            <Icon name="icon-pencil" className="" />
          </span>
          <span>{t('explore:analysis.Edit Location')}</span>
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
          <span>{t('explore:analysis.Customize Name')}</span>
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
          <span>{t('explore:analysis.Delete Location')}</span>
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
