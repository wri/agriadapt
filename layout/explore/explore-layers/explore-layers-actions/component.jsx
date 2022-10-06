import { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
// import { logEvent } from 'utils/analytics';
import { useTranslation } from 'next-i18next';

const ExploreDatasetsActions = (props) => {
  const {
    dataset,
    layer,
    layerGroups,
    toggleMapLayerGroup,
    resetMapLayerGroupsInteraction,
  } = props;

  const isActive = useMemo(
    () => !!layerGroups.find((l) => l.dataset === dataset.id),
    [dataset, layerGroups]
  );

  const handleToggleLayerGroup = useCallback(
    (event) => {
      event.stopPropagation();
      // if (!isActive)
      //   logEvent('Explore', 'Add Dataset', dataset.slug);

      toggleMapLayerGroup({ dataset, toggle: !isActive });
      resetMapLayerGroupsInteraction();
    },
    [isActive, dataset, toggleMapLayerGroup, resetMapLayerGroupsInteraction]
  );

  const { t } = useTranslation(['explore', 'common']);

  return (
    <div className="c-explore-layers-actions">
      <button
        className={classnames({
          'c-button': true,
          '-secondary': !isActive,
          '-primary': isActive,
          '-compressed': true,
          '-disable': !layer,
          '-fullwidth': true,
        })}
        type="button"
        disabled={!layer}
        onClick={handleToggleLayerGroup}
      >
        {isActive ? t('explore:explore_detail.Active') : t('explore:layers.Add to map')}
      </button>
    </div>
  );
};

ExploreDatasetsActions.defaultProps = {
  selectedCollection: null,
};

ExploreDatasetsActions.propTypes = {
  dataset: PropTypes.shape({
    id: PropTypes.string.isRequired,
    metadata: PropTypes.arrayOf(
      PropTypes.shape({
        info: PropTypes.shape({
          name: PropTypes.string,
        }),
      })
    ),
  }).isRequired,
  layer: PropTypes.shape({}).isRequired,
  selectedCollection: PropTypes.string,
  layerGroups: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  toggleMapLayerGroup: PropTypes.func.isRequired,
  resetMapLayerGroupsInteraction: PropTypes.func.isRequired,
};

export default ExploreDatasetsActions;
