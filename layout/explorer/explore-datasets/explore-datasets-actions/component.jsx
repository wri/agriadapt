import {
  useCallback,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// Components
import Icon from 'components/ui/icon';

// Tooltip
import { Tooltip } from 'vizzuality-components';
import CollectionsPanel from 'components/collections-panel';

// hooks
// import useBelongsToCollection from 'hooks/collection/belongs-to-collection';
// import useFetchCollection from 'hooks/collection/fetch-collection';

// Utils
import { logEvent } from 'utils/analytics';



const ExploreDatasetsActions = (props) => {
  const {
    dataset,
    layer,
    user,
    selectedCollection,
    layerGroups,
    toggleMapLayerGroup,
    resetMapLayerGroupsInteraction,
  } = props;

  const isActive = useMemo(
    () => !!layerGroups.find((l) => l.dataset === dataset.id),
    [dataset, layerGroups],
  );

  const handleToggleLayerGroup = useCallback((event) => {
    event.stopPropagation();

    toggleMapLayerGroup({ dataset, toggle: !isActive });
    resetMapLayerGroupsInteraction();
  }, [isActive, dataset, toggleMapLayerGroup, resetMapLayerGroupsInteraction]);

  const userIsLoggedIn = user.token;
  const datasetName = dataset?.metadata[0]?.info?.name;

  const starIconName = classnames({
    'icon-star-full': false,
    'icon-star-empty': true,
  });
  const starIconClass = classnames({
    '-small': true,
    '-filled': true,
    '-empty': true,
  });

  return (
    <div className="c-explore-datasets-actions">
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
        {isActive ? 'Active' : 'Add to map'}
      </button>
      {/* Favorite dataset icon */}
      <button
        type="button"
        className="c-button -secondary -compressed"
        tabIndex={-1}
        onClick={(event) => {
          event.stopPropagation();
          if (userIsLoggedIn) {
            logEvent('Explore Menu', 'Authenticated user Clicks Star', datasetName);
          }
        }}
      >
        <Icon
          name={starIconName}
          className={starIconClass}
        />
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
      }),
    ),
  }).isRequired,
  layer: PropTypes.shape({}).isRequired,
  selectedCollection: PropTypes.string,
  layerGroups: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,
  toggleMapLayerGroup: PropTypes.func.isRequired,
  resetMapLayerGroupsInteraction: PropTypes.func.isRequired,
  user: PropTypes.shape({
    token: PropTypes.string,
  }).isRequired,
};

export default ExploreDatasetsActions;
